import { readLines } from "https://deno.land/std@0.156.0/io/buffer.ts";
import generateStaticMesh from "./generateStaticMesh.ts";

export type MeshData = {
  location: {
    x: string;
    y: string;
    z: string;
  };
  rotation: {
    x: string;
    y: string;
    z: string;
  };
  drawScale: string;
  tag: string;
};

async function parseFoilageActors() {
  const text = await Deno.open("./foilage.txt");
  const data: MeshData[] = [];

  let currentStaticMesh = null;

  for await (const l of readLines(text)) {
    const line = l.trim();
    const meshData = {} as MeshData;

    if (line.match(/Begin Foliage/)) {
      const staticMesh = line.match(/(?<=StaticMesh=).*?(?=\s)/)?.[0];

      if (staticMesh) {
        currentStaticMesh = staticMesh;
      }
    }

    if (line.match(/Location\=/) && currentStaticMesh) {
      const location = line.match(/(?<=Location=).*?(?=\s)/)?.[0];

      if (!location) continue;

      const [x, y, z] = location.split(",");
      meshData.location = { x, y, z };
    }

    if (line.match(/Rotation\=/) && currentStaticMesh) {
      const rotation = line.match(/(?<=Rotation=).*?(?=\s)/)?.[0];

      if (!rotation) continue;

      // NOTE: This might be y, z, x
      const [y, z, x] = rotation.split(",");
      meshData.rotation = { x, y, z };
    }

    if (line.match(/DrawScale3D\=/) && currentStaticMesh) {
      const drawScale = line.match(/(?<=DrawScale3D=).*?(?=\s)/)?.[0];

      if (!drawScale) continue;

      // NOTE: This might be y, z, x
      const [scale] = drawScale.split(",");
      meshData.drawScale = scale;
    }

    if (currentStaticMesh && meshData.location) {
      data.push({ ...meshData, tag: currentStaticMesh });
    }
  }

  return data;
}

function generateOutput(data: MeshData[]) {
  const meshes = data.reduce((acc, meshData) => {
    const staticMesh = generateStaticMesh(meshData);

    return `${acc}${staticMesh}`;
  }, "");

  return `
  Begin Map
    Begin Level
      ${meshes}
    End Level
    Begin Surface
    End Surface
  End Map
  `;
}

const data = await parseFoilageActors();
const output = generateOutput(data);

await Deno.writeTextFile("./output/static-mesh.txt", output);
await Deno.writeTextFile("./output/debug.txt", JSON.stringify(data, null, 2));
