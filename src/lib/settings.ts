import { eq } from "drizzle-orm";
import { db, schema } from "@/db";

const REQUIRE_APPROVAL = "require_approval";

/**
 * ¿Hay que aprobar a mano a los nuevos miembros? Por defecto sí.
 * Si algo falla al leer el ajuste, también devuelve true (el lado seguro).
 */
export async function getRequireApproval(): Promise<boolean> {
  try {
    const [row] = await db
      .select({ value: schema.appSetting.value })
      .from(schema.appSetting)
      .where(eq(schema.appSetting.key, REQUIRE_APPROVAL));
    return row ? row.value !== "false" : true;
  } catch (e) {
    console.error("[settings] no se pudo leer require_approval", e);
    return true;
  }
}

export async function setRequireApproval(value: boolean) {
  await db
    .insert(schema.appSetting)
    .values({ key: REQUIRE_APPROVAL, value: String(value) })
    .onConflictDoUpdate({ target: schema.appSetting.key, set: { value: String(value) } });
}
