FROM python:3.10-slim

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

COPY Pipfile Pipfile.lock ./
RUN python -m pip install --upgrade pip
RUN pip install pipenv && pipenv install --system --deploy --ignore-pipfile

COPY . /app

EXPOSE 8000

CMD sh -c 'daphne -b 0.0.0.0 -p ${PORT:-8000} core.asgi:application'