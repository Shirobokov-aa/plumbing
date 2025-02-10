-- Создаем таблицу для страницы ванной
CREATE TABLE IF NOT EXISTS bathroom_page (
    id SERIAL PRIMARY KEY,
    data JSONB NOT NULL DEFAULT '{}'
);

-- Создаем таблицу для страницы кухни
CREATE TABLE IF NOT EXISTS kitchen_page (
    id SERIAL PRIMARY KEY,
    data JSONB NOT NULL DEFAULT '{}'
);

-- Создаем таблицу для страницы о нас
CREATE TABLE IF NOT EXISTS about_page (
    id SERIAL PRIMARY KEY,
    data JSONB NOT NULL DEFAULT '{}'
);
