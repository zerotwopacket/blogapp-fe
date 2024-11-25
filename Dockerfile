FROM python:3

WORKDIR /app

COPY dist ./

EXPOSE 8000

CMD ["python", "-m", "http.server"]
