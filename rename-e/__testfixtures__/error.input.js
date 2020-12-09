export async function get(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    return res.json();
  } catch (e) {
    console.error(e);
    throw e;
  }
}
