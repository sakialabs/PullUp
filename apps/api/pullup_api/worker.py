from __future__ import annotations

import argparse
import logging
import os
import signal
import time
from collections.abc import Sequence

from pullup_api.config import Settings
from pullup_api.database import Database
from pullup_api.models import OutboxEvent
from pullup_api.modules.outbox.service import OutboxProcessor

logger = logging.getLogger("pullup.worker")
stopping = False


def log_unhandled_event(event: OutboxEvent) -> None:
    """Safe proof handler; production topics must register explicit adapters."""
    logger.info("Delivered outbox event id=%s topic=%s", event.id, event.topic)


def request_stop(_signum: int, _frame: object) -> None:
    global stopping
    stopping = True


def run(*, once: bool, poll_seconds: float) -> None:
    database = Database(Settings.from_env().database_url)
    processor = OutboxProcessor({"system.proof": log_unhandled_event})

    signal.signal(signal.SIGTERM, request_stop)
    signal.signal(signal.SIGINT, request_stop)
    try:
        while not stopping:
            with database.session_factory.begin() as session:
                result = processor.process_batch(session)
            if result.published or result.failed:
                logger.info(
                    "Outbox batch complete published=%s failed=%s",
                    result.published,
                    result.failed,
                )
            if once:
                return
            time.sleep(poll_seconds)
    finally:
        database.dispose()


def main(argv: Sequence[str] | None = None) -> None:
    parser = argparse.ArgumentParser(description="Process committed PullUp outbox events")
    parser.add_argument("--once", action="store_true", help="Process one batch and exit")
    parser.add_argument(
        "--poll-seconds",
        type=float,
        default=float(os.getenv("PULLUP_WORKER_POLL_SECONDS", "2")),
    )
    args = parser.parse_args(argv)
    logging.basicConfig(level=os.getenv("PULLUP_LOG_LEVEL", "INFO"))
    run(once=args.once, poll_seconds=args.poll_seconds)


if __name__ == "__main__":
    main()
