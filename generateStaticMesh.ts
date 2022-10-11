import { MeshData } from "./index.ts";

export default function generateStaticMesh(meshData: MeshData) {
  return `
      Begin Actor Class=StaticMeshActor Name=StaticMeshActor_2 Archetype=StaticMeshActor'Engine.Default__StaticMeshActor'
        Begin Object Class=StaticMeshComponent Name=StaticMeshComponent0 ObjName=StaticMeshComponent_9 Archetype=StaticMeshComponent'Engine.Default__StaticMeshActor:StaticMeshComponent0'
           StaticMesh=StaticMesh'${meshData.tag}'
           VertexPositionVersionNumber=2
           ReplacementPrimitive=None
           PreviewEnvironmentShadowing=255
           bAllowApproximateOcclusion=True
           bAcceptsDynamicDecals=False
           bForceDirectLightMap=True
           bUsePrecomputedShadows=True
           bDisableAllRigidBody=True
           LightingChannels=(bInitialized=True,Static=True)
           Name="StaticMeshComponent_9"
           ObjectArchetype=StaticMeshComponent'Engine.Default__StaticMeshActor:StaticMeshComponent0'
        End Object
        StaticMeshComponent=StaticMeshComponent'StaticMeshComponent_9'
        Components(0)=StaticMeshComponent'StaticMeshComponent_9'
        Location=(X=${meshData.location.x},Y=${meshData.location.y},Z=${meshData.location.z})
        Rotation=(Pitch=${meshData.rotation.y},Yaw=${meshData.rotation.z},Roll=${meshData.rotation.x})
        DrawScale=${meshData.drawScale}
        BlockRigidBody=True
        CreationTime=8370.324219
        Tag="FoilageToStatic.${meshData.tag}"
        CollisionComponent=StaticMeshComponent'StaticMeshComponent_9'
        Name="StaticMeshActor_2"
        ObjectArchetype=StaticMeshActor'Engine.Default__StaticMeshActor'
      End Actor`;
}
