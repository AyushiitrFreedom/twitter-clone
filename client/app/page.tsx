"use client";
import { Button } from "@/components/ui/button";
export default function Page() {
  return <Button onClick={() => localStorage.removeItem('token')}>Button</Button>
}