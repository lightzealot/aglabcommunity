INSERT INTO "board" ("id", "name", "description", "position") VALUES
  ('automatizacion', 'Automatización y flujos', 'Workflows, nodos, errores y automatizaciones que ya corren solas.', 1),
  ('agentes-ia', 'Agentes IA', 'Claude, GPT, modelos locales, RAG y agentes que hacen el trabajo por ti.', 2),
  ('procesos', 'Procesos y operaciones', 'Cómo mapear, simplificar y medir los procesos de una empresa de servicios.', 3),
  ('ventas-clientes', 'Ventas y clientes', 'Cómo cotizar, cobrar, conseguir clientes y vender tus mejoras con IA.', 4),
  ('herramientas', 'Herramientas y stack', 'Qué usar para qué: apps, integraciones, APIs y servidores.', 5),
  ('general', 'General', 'Lo que no encaja en los demás boards.', 6)
ON CONFLICT ("id") DO NOTHING;
