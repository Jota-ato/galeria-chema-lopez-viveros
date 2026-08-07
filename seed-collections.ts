import { db } from "@/db";
import { collections } from "@/db/schema";
import { generateSlug } from "@/shared/lib/slug";
import { NewCollection } from "@/features/collections/types/collections.types";

type CollectionStatus = NewCollection["status"];

const STATUS_WEIGHTS: [CollectionStatus, number][] = [
  ["published", 0.6],
  ["draft", 0.25],
  ["archived", 0.15],
];

const COLLECTION_THEMES: { name: string; description: string }[] = [
  {
    name: "Paisajes urbanos",
    description: "Escenas de ciudad capturadas en horas de tránsito y quietud",
  },
  {
    name: "Naturaleza muerta",
    description: "Composiciones de objetos cotidianos bajo luz natural",
  },
  {
    name: "Fauna marina",
    description: "Criaturas de mar interpretadas en acuarela y grabado",
  },
  {
    name: "Abstracción cromática",
    description: "Estudios de color puro sin referencia figurativa",
  },
  {
    name: "Cuerpos en movimiento",
    description: "Estudios de danza y gesto capturados a lápiz y carbón",
  },
  {
    name: "Arquitectura brutalista",
    description: "Estructuras de concreto documentadas en técnica mixta",
  },
  {
    name: "Flora nocturna",
    description: "Plantas y jardines observados bajo luz artificial",
  },
  {
    name: "Manos y gestos",
    description: "Estudios anatómicos centrados en la expresión de las manos",
  },
  {
    name: "Sombras y luz",
    description: "Ejercicios de claroscuro en distintos soportes",
  },
  {
    name: "Memoria familiar",
    description: "Retratos íntimos inspirados en álbumes fotográficos antiguos",
  },
  {
    name: "Ciudades imaginarias",
    description: "Arquitecturas especulativas construidas desde la imaginación",
  },
  {
    name: "Texturas minerales",
    description: "Piedras, sedimentos y superficies rocosas en detalle",
  },
  {
    name: "Ritual y mito",
    description: "Piezas inspiradas en tradiciones populares y simbolismo",
  },
  {
    name: "Insectos",
    description: "Estudios entomológicos en tinta y acuarela",
  },
  {
    name: "Ventanas",
    description: "Marcos y umbrales como punto de fuga compositivo",
  },
  {
    name: "Desiertos",
    description: "Paisajes áridos y su relación con la escala humana",
  },
  {
    name: "Bosques boreales",
    description: "Vegetación fría capturada en óleo y témpera",
  },
  {
    name: "Máscaras",
    description: "Objetos ceremoniales reinterpretados en técnica mixta",
  },
  {
    name: "Objetos cotidianos",
    description: "Bodegones de utensilios domésticos y herramientas",
  },
  {
    name: "Geometría sagrada",
    description: "Patrones y proporciones presentes en tradiciones místicas",
  },
  {
    name: "Migraciones",
    description: "Piezas sobre desplazamiento humano y animal",
  },
  {
    name: "Instrumentos musicales",
    description: "Estudios formales de instrumentos de cuerda y viento",
  },
  {
    name: "Cielos tormentosos",
    description: "Estudios atmosféricos de nubes y luz cambiante",
  },
  {
    name: "Espejos",
    description: "Reflejos y duplicidad como recurso compositivo",
  },
  {
    name: "Infancia",
    description: "Escenas cotidianas vistas desde la mirada infantil",
  },
  {
    name: "Ríos y cauces",
    description: "Cuerpos de agua dulce documentados en distintas estaciones",
  },
  {
    name: "Herramientas antiguas",
    description: "Objetos de trabajo manual con marcas de uso",
  },
  {
    name: "Mercados populares",
    description: "Escenas de comercio local y color urbano",
  },
  {
    name: "Vitrales",
    description: "Estudios de luz filtrada y composición geométrica",
  },
  {
    name: "Danza",
    description: "Cuerpos en movimiento capturados en técnica mixta",
  },
];

function pickStatus(): CollectionStatus {
  const roll = Math.random();
  let acc = 0;
  for (const [status, weight] of STATUS_WEIGHTS) {
    acc += weight;
    if (roll <= acc) return status;
  }
  return STATUS_WEIGHTS[0][0];
}

function randomDateBetween(start: Date, end: Date): Date {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime()),
  );
}

async function seedCollections() {
  const rangeStart = new Date("2025-09-01");
  const rangeEnd = new Date("2026-08-01");

  const values: NewCollection[] = COLLECTION_THEMES.map((theme) => {
    const slug = generateSlug(theme.name);
    const createdAt = randomDateBetween(rangeStart, rangeEnd);
    const updatedAt = randomDateBetween(createdAt, rangeEnd);

    return {
      name: theme.name,
      slug,
      description: theme.description,
      banner: `https://picsum.photos/seed/${slug}/800/450`,
      status: pickStatus(),
      createdAt,
      updatedAt,
    };
  });

  const inserted = await db
    .insert(collections)
    .values(values)
    .onConflictDoNothing({ target: collections.slug })
    .returning();

  console.log(
    `Se insertaron ${inserted.length} de ${values.length} colecciones (duplicados por slug se omitieron).`,
  );
}

seedCollections()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("Error sembrando colecciones:", err);
    process.exit(1);
  });
