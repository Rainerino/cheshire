import * as THREE from 'three';

export default function point_cloud_from_mesh(mesh: THREE.Mesh): THREE.Points {
    const geometry = mesh.geometry as THREE.BufferGeometry;
    const positions = geometry.getAttribute('position');
    const pointsArray: number[] = [];

    for (let i = 0; i < positions.count; i++) {
        pointsArray.push(positions.getX(i), positions.getY(i), positions.getZ(i));
    }

    const pointGeometry = new THREE.BufferGeometry();
    pointGeometry.setAttribute('position', new THREE.Float32BufferAttribute(pointsArray, 3));

    const material = new THREE.PointsMaterial({ size: 0.05, color: 0xffffff });
    return new THREE.Points(pointGeometry, material);
}