"use client";

import { useEffect, useRef, useState, type PointerEvent } from "react";

type SignaturePadFieldProps = {
  id?: string;
  name: string;
  label: string;
  required?: boolean;
  className?: string;
};

export default function SignaturePadField({
  id,
  name,
  label,
  required = false,
  className,
}: SignaturePadFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const canvasWrapRef = useRef<HTMLDivElement | null>(null);
  const hiddenInputRef = useRef<HTMLInputElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasSignature, setHasSignature] = useState(false);

  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    const wrap = canvasWrapRef.current;

    if (!canvas || !wrap) {
      return;
    }

    const ratio = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
    const width = Math.max(1, Math.floor(wrap.clientWidth));
    const height = 92;
    const previousSignature = hasSignature ? canvas.toDataURL("image/png") : "";

    canvas.width = Math.floor(width * ratio);
    canvas.height = Math.floor(height * ratio);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const context = canvas.getContext("2d");
    if (!context) {
      return;
    }

    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    context.lineWidth = 1.8;
    context.lineCap = "round";
    context.lineJoin = "round";
    context.strokeStyle = "rgba(248, 248, 248, 0.95)";

    if (previousSignature) {
      const image = new Image();
      image.onload = () => {
        context.drawImage(image, 0, 0, width, height);
      };
      image.src = previousSignature;
    }
  };

  useEffect(() => {
    resizeCanvas();

    const onResize = () => {
      resizeCanvas();
    };

    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const hiddenInput = hiddenInputRef.current;
    const formElement = hiddenInput?.form;

    if (!formElement) {
      return;
    }

    const onFormReset = () => {
      clearSignature();
    };

    formElement.addEventListener("reset", onFormReset);
    return () => {
      formElement.removeEventListener("reset", onFormReset);
    };
  }, []);

  const getPoint = (event: PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return { x: 0, y: 0 };
    }

    const rect = canvas.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
  };

  const persistSignature = () => {
    const canvas = canvasRef.current;
    const hiddenInput = hiddenInputRef.current;
    if (!canvas || !hiddenInput) {
      return;
    }

    hiddenInput.value = canvas.toDataURL("image/png");
  };

  const handlePointerDown = (event: PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) {
      return;
    }

    const point = getPoint(event);
    context.beginPath();
    context.moveTo(point.x, point.y);
    setIsDrawing(true);
    canvas.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing) {
      return;
    }

    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) {
      return;
    }

    const point = getPoint(event);
    context.lineTo(point.x, point.y);
    context.stroke();

    if (!hasSignature) {
      setHasSignature(true);
    }

    persistSignature();
  };

  const handlePointerUp = (event: PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing) {
      return;
    }

    const canvas = canvasRef.current;
    if (canvas && canvas.hasPointerCapture(event.pointerId)) {
      canvas.releasePointerCapture(event.pointerId);
    }

    setIsDrawing(false);
    persistSignature();
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    const hiddenInput = hiddenInputRef.current;
    const context = canvas?.getContext("2d");

    if (!canvas || !context || !hiddenInput) {
      return;
    }

    context.clearRect(0, 0, canvas.width, canvas.height);
    hiddenInput.value = "";
    setHasSignature(false);
  };

  return (
    <div data-signature-panel="true" className={`rounded-xl border border-white/20 bg-white/[0.03] p-4 ${className ?? ""}`}>
      <div className="mb-3 flex justify-end">
        <button
          type="button"
          onClick={clearSignature}
          className="rounded-md border border-white/25 px-4 py-1.5 text-sm font-medium text-white/90"
        >
          Clear
        </button>
      </div>
      <div ref={canvasWrapRef} className="relative">
        <canvas
          ref={canvasRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          className="h-[92px] w-full touch-none rounded-md"
        />
        {!hasSignature ? (
          <span className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 text-base text-gray-500">
            Draw signature
          </span>
        ) : null}
      </div>
      <input
        id={id}
        ref={hiddenInputRef}
        type="hidden"
        name={name}
        data-signature-field="true"
        data-signature-required={required ? "true" : "false"}
      />
      <div className="mt-3 border-t border-white/20" />
      <div className="mt-2 flex items-center justify-between text-sm leading-none text-gray-400">
        <span className="text-gray-400 no-underline">{label}</span>
        <span className="text-gray-400 no-underline">Timestamp captured on sign</span>
      </div>
    </div>
  );
}
