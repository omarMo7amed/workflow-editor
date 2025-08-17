export default async function SettingsPage() {
  await new Promise((resolve) => setTimeout(resolve, 4000)); // Simulate loading delay
  return <div>Settings</div>;
}
