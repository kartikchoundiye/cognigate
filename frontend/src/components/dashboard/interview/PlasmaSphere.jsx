import { useEffect, useRef } from "react";
import * as THREE from "three";
import useInterview
    from "@/hooks/useInterview";

function PlasmaSphere({ volume = 0 }) {

    const {
        status,
    } = useInterview();

    const mountRef = useRef(null);
    const statusRef = useRef(status);

    useEffect(() => {
        statusRef.current = status;
    }, [status]);

    useEffect(() => {

        const container = mountRef.current;

        const scene = new THREE.Scene();

        const camera = new THREE.PerspectiveCamera(
            75,
            container.clientWidth / container.clientHeight,
            0.1,
            1000
        );

        camera.position.z = 5;

        const renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true,
        });

        renderer.setSize(
            container.clientWidth,
            container.clientHeight
        );

        renderer.setPixelRatio(
            Math.min(window.devicePixelRatio, 2)
        );

        container.appendChild(renderer.domElement);

        // ==========================
        // MAIN GROUP
        // ==========================

        const group = new THREE.Group();
        scene.add(group);

        // ==========================
        // CORE SPHERE
        // ==========================

        const sphereGeometry =
            new THREE.IcosahedronGeometry(
                1.1,
                20
            );

        const sphereMaterial =
            new THREE.MeshStandardMaterial({
                color: 0x3b82f6,
                emissive: 0x2563eb,
                emissiveIntensity: 2,
                wireframe: true,
            });

        const sphere =
            new THREE.Mesh(
                sphereGeometry,
                sphereMaterial
            );

        group.add(sphere);

        // ==========================
        // OUTER RING
        // ==========================

        const ringGeometry =
            new THREE.TorusGeometry(
                1.8,
                0.03,
                16,
                100
            );

        const ringMaterial =
            new THREE.MeshBasicMaterial({
                color: 0x60a5fa,
            });

        const ring =
            new THREE.Mesh(
                ringGeometry,
                ringMaterial
            );

        ring.rotation.x = Math.PI / 2;

        group.add(ring);

        // ==========================
        // SECOND RING
        // ==========================

        const ring2 =
            new THREE.Mesh(
                ringGeometry,
                ringMaterial.clone()
            );

        ring2.rotation.y = Math.PI / 2;

        group.add(ring2);

        // ==========================
        // LIGHTS
        // ==========================

        const ambient =
            new THREE.AmbientLight(
                0xffffff,
                1.5
            );

        scene.add(ambient);

        const pointLight =
            new THREE.PointLight(
                0x60a5fa,
                10,
                100
            );

        pointLight.position.set(
            0,
            0,
            4
        );

        scene.add(pointLight);

        // ==========================
        // PARTICLES
        // ==========================

        const particlesCount = 1000;

        const particlesGeometry =
            new THREE.BufferGeometry();

        const positions =
            new Float32Array(
                particlesCount * 3
            );

        for (
            let i = 0;
            i < particlesCount * 3;
            i++
        ) {
            positions[i] =
                (Math.random() - 0.5) * 8;
        }

        particlesGeometry.setAttribute(
            "position",
            new THREE.BufferAttribute(
                positions,
                3
            )
        );

        const particlesMaterial =
            new THREE.PointsMaterial({
                color: "#60a5fa",
                size: 0.03,
                transparent: true,
            });

        const particles =
            new THREE.Points(
                particlesGeometry,
                particlesMaterial
            );

        scene.add(particles);

        // ==========================
        // GLOW HALO
        // ==========================

        const glowGeometry =
            new THREE.SphereGeometry(
                1.4,
                32,
                32
            );

        const glowMaterial =
            new THREE.MeshBasicMaterial({
                color: 0x60a5fa,
                transparent: true,
                opacity: 0.15,
            });

        const glow =
            new THREE.Mesh(
                glowGeometry,
                glowMaterial
            );

        group.add(glow);

        // ==========================
        // ANIMATION
        // ==========================

        const clock = new THREE.Timer();
        let frameId;

        const animate = (timestamp) => {

            frameId = requestAnimationFrame(
                animate
            );

            clock.update(timestamp);
            const time =
                clock.getElapsed();

            sphere.rotation.x += 0.003;
            sphere.rotation.y += 0.005;

            ring.rotation.z += 0.004;
            ring2.rotation.x += 0.003;

            particles.rotation.y += 0.0008;

            const pulse =
                1 +
                Math.sin(time * 2) *
                0.03;

            glow.scale.set(
                pulse,
                pulse,
                pulse
            );

            // =====================
            // SPEAKING MODE
            // =====================

            const currentStatus = statusRef.current;
            const isSpeaking = currentStatus === "speaking";
            const isListening = currentStatus === "listening";
            const isThinking = currentStatus === "thinking";

            if (isSpeaking) {
                const voicePulse = 1 + volume * 0.005;
                sphere.scale.set(voicePulse, voicePulse, voicePulse);
                glow.material.opacity = 0.40;
            }
            else if (isListening) {
                sphere.scale.set(1, 1, 1);
                glow.material.opacity = 0.25;
            }
            else if (isThinking) {
                sphere.scale.set(1, 1, 1);
                glow.material.opacity = 0.30;
            }
            else {
                sphere.scale.set(1, 1, 1);
                glow.material.opacity = 0.15;
            }

            renderer.render(
                scene,
                camera
            );
        };

        animate();

        // ==========================
        // RESIZE
        // ==========================

        const handleResize = () => {

            camera.aspect =
                container.clientWidth /
                container.clientHeight;

            camera.updateProjectionMatrix();

            renderer.setSize(
                container.clientWidth,
                container.clientHeight
            );
        };

        window.addEventListener(
            "resize",
            handleResize
        );

        return () => {
            if (frameId) {
                cancelAnimationFrame(frameId);
            }

            window.removeEventListener(
                "resize",
                handleResize
            );

            container.removeChild(
                renderer.domElement
            );

            sphereGeometry.dispose();
            sphereMaterial.dispose();
            ringGeometry.dispose();
            ringMaterial.dispose();
            ring2.material.dispose();
            particlesGeometry.dispose();
            particlesMaterial.dispose();
            glowGeometry.dispose();
            glowMaterial.dispose();

            renderer.forceContextLoss();
            renderer.dispose();
        };

    }, []);

    return (
        <div
            ref={mountRef}
            className="w-full h-full"
        />
    );
}

export default PlasmaSphere;