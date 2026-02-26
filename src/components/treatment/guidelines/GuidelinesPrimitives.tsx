"use client";

import { useEffect, useRef, useState, type PointerEvent, type ReactNode } from "react";

export function GuidelinesBulletList({
  items,
  compact = false,
}: {
  items: readonly string[];
  compact?: boolean;
}) {
  return (
    <ul
      className={`${compact ? "space-y-1.5" : "space-y-2"} mt-3 text-base leading-relaxed text-gray-200 md:text-lg`}
    >
      {items.map((item) => (
        <li key={item} className="flex gap-2.5">
          <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-[#D4AF37]" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function GuidelinesSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-white/12 bg-black/35 p-5 md:p-6">
      <h2 className="text-lg font-bold text-white md:text-xl">{title}</h2>
      <div className="mt-4 space-y-4 text-base leading-relaxed text-gray-200 md:text-lg">{children}</div>
    </section>
  );
}

function SignaturePanel({
  label,
  name,
  required = false,
}: {
  label: string;
  name: string;
  required?: boolean;
}) {
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
    <div data-signature-panel="true" className="rounded-xl border border-white/20 bg-white/[0.03] p-4">
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
        ref={hiddenInputRef}
        type="hidden"
        name={name}
        data-signature-field="true"
        data-signature-required={required ? "true" : "false"}
      />
      <div className="mt-3 flex items-center justify-between border-t border-white/20 pt-3 text-sm text-gray-400">
        <span>{label}</span>
        <span>Timestamp captured on sign</span>
      </div>
    </div>
  );
}

export function GuidelinesSignatureSection({
  prefix,
  clientPrompt = "Please sign below to confirm you've read and understood the guide",
  employeePrompt = "Please sign below to confirm the client has read and understood the guide",
  showEmployeeSection = false,
}: {
  prefix: string;
  clientPrompt?: string;
  employeePrompt?: string;
  showEmployeeSection?: boolean;
}) {
  const clientNameField = `${prefix}ClientName`;
  const employeeNameField = `${prefix}EmployeeName`;

  return (
    <section className="rounded-2xl border border-white/12 bg-black/35 p-5 md:p-6">
      <div className="space-y-8">
        <hr className="border-white/25" />
        <div className="space-y-5">
          <p className="text-base leading-relaxed text-gray-200 md:text-lg">
            1. {clientPrompt} <span className="text-red-300">*</span>
          </p>
          <label className="flex items-start gap-2 text-base text-gray-200">
            <input className="mt-1" type="checkbox" name={`${prefix}ElectronicClient`} required />
            <span>
              I agree to use <span className="text-[#2ea5ff]">electronic records and signatures.</span>
            </span>
          </label>
          <SignaturePanel label="Customer Signature" name={`${prefix}ClientSignature`} required />
          <label htmlFor={clientNameField} className="block text-base text-gray-200">
            Client&apos;s Name
          </label>
          <input
            id={clientNameField}
            name={clientNameField}
            type="text"
            className="w-full rounded-xl border border-neutral-800 bg-neutral-900/80 px-4 py-3 text-base text-white outline-none transition-colors focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20"
          />
        </div>

        {showEmployeeSection ? (
          <div className="space-y-5">
            <p className="text-base leading-relaxed text-gray-200 md:text-lg">2. {employeePrompt}</p>
            <label className="flex items-start gap-2 text-base text-gray-200">
              <input className="mt-1" type="checkbox" name={`${prefix}ElectronicEmployee`} />
              <span>
                I agree to use <span className="text-[#2ea5ff]">electronic records and signatures.</span>
              </span>
            </label>
            <SignaturePanel label="Employee Signature" name={`${prefix}EmployeeSignature`} />
            <p className="rounded-lg border border-[#2ea5ff]/20 bg-[#2ea5ff]/10 px-4 py-3 text-sm text-[#72c7ff]">
              Note: Customers will not see the employee signature field when filling form online.
            </p>
            <label htmlFor={employeeNameField} className="block text-base text-gray-200">
              Employee&apos;s Name
            </label>
            <input
              id={employeeNameField}
              name={employeeNameField}
              type="text"
              className="w-full rounded-xl border border-neutral-800 bg-neutral-900/80 px-4 py-3 text-base text-white outline-none transition-colors focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20"
            />
          </div>
        ) : null}
        <hr className="border-white/25" />
      </div>
    </section>
  );
}
