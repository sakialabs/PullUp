FROM ghcr.io/astral-sh/uv:0.11.14 AS uv

FROM python:3.13-slim AS runtime

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PATH="/app/.venv/bin:$PATH"

WORKDIR /app
COPY --from=uv /uv /uvx /bin/
COPY pyproject.toml uv.lock ./
RUN uv sync --frozen --no-dev --no-install-project

COPY . ./
RUN uv sync --frozen --no-dev

EXPOSE 8000
CMD ["uvicorn", "pullup_api.main:app", "--host", "0.0.0.0", "--port", "8000"]
