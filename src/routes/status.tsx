"use client";

import Link from "next/link";
import { useState } from "react";
import { AlertTriangle, CheckCircle, ChevronDown, ChevronUp, Circle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const SERVICES = [
  { name: "Radar API", status: "operational", lastIncident: "2024-05-01" },
  { name: "Signal Database", status: "degraded", lastIncident: "2024-04-28" },
  { name: "Authentication", status: "operational", lastIncident: null },
  { name: "Alerts", status: "operational", lastIncident: null },
];

const INCIDENTS = [
  { service: "Signal Database", date: "2024-04-28", desc: "Performance issues resolved." },
  { service: "Radar API", date: "2024-05-01", desc: "Minor outage resolved." },
];

const HISTORY = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1];

function StatusIcon({ status }: { status: string }) {
  if (status === "operational") return <CheckCircle className="h-4 w-4 text-emerald-500" />;
  if (status === "degraded") return <AlertTriangle className="h-4 w-4 text-amber-500" />;
  return <Circle className="h-4 w-4 text-red-500" />;
}

export default StatusPage;

function UptimeBar({ status }: { status: string }) {
  return (
    <div className="mt-1 flex gap-0.5">
      {HISTORY.map((value, index) => (
        <span
          key={index}
          className={`h-6 w-1 rounded-sm ${status === "degraded" && index === 27 ? "bg-amber-400" : value ? "bg-emerald-400" : "bg-red-400"}`}
          title={value ? "Operational" : "Incident"}
        />
      ))}
    </div>
  );
}

function StatusPage() {
  const [showIncidents, setShowIncidents] = useState(false);

  return (
    <main className="min-h-screen bg-background px-6 py-12 text-foreground">
      <div className="mx-auto max-w-3xl">
        <Link href="/" className="text-sm font-semibold">← PostPuls</Link>
        <Card className="mx-auto mt-10 w-full max-w-xl p-2 md:p-4">
          <CardContent className="flex flex-col gap-6 p-6">
            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="text-lg font-semibold">System Status</span>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => setShowIncidents((value) => !value)}
                  aria-label={showIncidents ? "Hide incident history" : "Show incident history"}
                >
                  {showIncidents ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  <span className="text-xs">{showIncidents ? "Hide" : "Incident History"}</span>
                </Button>
              </div>

              <div className="flex flex-col gap-3">
            {SERVICES.map((service) => (
                  <div key={service.name} className="flex flex-col gap-1">
                    <div className="flex flex-wrap items-center gap-4">
                      <StatusIcon status={service.status} />
                      <span className="font-medium">{service.name}</span>
                      <span className="text-xs capitalize text-muted-foreground">{service.status}</span>
                      {service.lastIncident && (
                        <span className="ml-auto text-xs text-muted-foreground">Last: {service.lastIncident}</span>
                      )}
                    </div>
                    <UptimeBar status={service.status} />
                  </div>
            ))}
              </div>
            </div>

            {showIncidents && (
              <div className="mt-2 flex flex-col gap-2 rounded-lg bg-accent p-4">
                <span className="mb-2 text-sm font-semibold">Incident History</span>
              {INCIDENTS.map((incident) => (
                  <div key={`${incident.service}-${incident.date}`} className="flex flex-col gap-1 border-b border-muted-foreground/10 pb-2 last:border-b-0 last:pb-0">
                    <span className="text-xs font-medium">{incident.service} - {incident.date}</span>
                    <span className="text-xs text-muted-foreground">{incident.desc}</span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
