import { useState, useRef } from "react";

export default function useMicrophone() {

    const [isListening, setIsListening] =
        useState(false);

    const [volume, setVolume] =
        useState(0);

    const audioContextRef =
        useRef(null);

    const analyserRef =
        useRef(null);

    const streamRef =
        useRef(null);

    const animationRef =
        useRef(null);

    const startListening = async () => {

        try {

            const stream =
                await navigator
                    .mediaDevices
                    .getUserMedia({
                        audio: true
                    });

            streamRef.current = stream;

            const audioContext =
                new AudioContext();

            audioContextRef.current =
                audioContext;

            const source =
                audioContext.createMediaStreamSource(
                    stream
                );

            const analyser =
                audioContext.createAnalyser();

            analyser.fftSize = 256;

            source.connect(analyser);

            analyserRef.current =
                analyser;

            setIsListening(true);

            analyzeAudio();

        } catch (error) {

            console.error(error);

            alert(
                "Microphone access denied"
            );
        }
    };

    const analyzeAudio = () => {

        const analyser =
            analyserRef.current;

        const dataArray =
            new Uint8Array(
                analyser.frequencyBinCount
            );

        const update = () => {

            analyser.getByteFrequencyData(
                dataArray
            );

            let sum = 0;

            for (
                let i = 0;
                i < dataArray.length;
                i++
            ) {
                sum += dataArray[i];
            }

            const average =
                sum / dataArray.length;

            setVolume(
                Math.min(
                    average,
                    100
                )
            );

            animationRef.current =
                requestAnimationFrame(
                    update
                );
        };

        update();
    };

    const stopListening = () => {

        if (animationRef.current) {

            cancelAnimationFrame(
                animationRef.current
            );
        }

        streamRef.current
            ?.getTracks()
            .forEach(track =>
                track.stop()
            );

        audioContextRef.current?.close();

        setVolume(0);

        setIsListening(false);
    };

    return {
        volume,
        isListening,
        startListening,
        stopListening,
    };
}