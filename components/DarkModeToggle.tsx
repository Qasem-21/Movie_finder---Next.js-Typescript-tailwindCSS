"use client";

export default function DarkModeToggle() {
  const toggle = () => {
    document.documentElement.classList.toggle("dark");
  };

  return (
    <button onClick={toggle} className="p-2 border rounded">
      Toggle Dark
    </button>
  );
}