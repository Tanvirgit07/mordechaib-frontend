import { IntegrationCard } from "./IntegrationCard";

const integrations = [
  ["Facebook", "Sync customer messages and schedule page posts", "/settings/integrations/facebook.svg", false],
  ["Instagram", "Manage direct messages and schedule media posts", "/settings/integrations/instagram.svg", false],
  ["Outlook Calendar", "Auto schedule meetings and check availability", "/settings/integrations/outlook.svg", true],
  ["Google Calendar", "Auto schedule meetings and check availability", "/settings/integrations/google-calendar.svg", false],
  ["Twilio", "Ingest voice calls, transcription, and client dialers", "/settings/integrations/twilio.svg", false],
  ["Gmail", "Synchronize leads pipeline and client timeline", "/settings/integrations/gmail.svg", false],
  ["Salesforce", "Migrate active enterprise contracts and deals", "/settings/integrations/salesforce-bg.png", false],
  ["HubSpot CRM", "Synchronize leads pipeline and client timeline", "/settings/integrations/hubspot.svg", false],
  ["Custom CRM API", "Synchronize leads pipeline and client timeline", "/settings/integrations/custom-crm.svg", false],
] as const;

export function IntegrationsPanel() {
  return (
    <section className="overflow-hidden rounded-lg bg-white">
      <header className="border-b border-[#E4EAF8] p-4">
        <h2 className="text-xl font-medium text-[#0E1224]">Integrations</h2>
      </header>
      <div className="grid gap-4 p-4 md:grid-cols-2">
        {integrations.map(([name, description, icon, connected]) => (
          <IntegrationCard key={name} name={name} description={description} icon={icon} initiallyConnected={connected} />
        ))}
      </div>
    </section>
  );
}
