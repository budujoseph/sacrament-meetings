import NavLinks from "./NavLinks";
export default function Header() {
    const currentDate = new Intl.DateTimeFormat("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    }).format(new Date());

  return (
      <header className="bg-blue-600 text-white p-4">
          <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-4 lg:flex-row lg:justify-between">
            <div className="w-full text-center lg:text-left">
                <h1 className="text-2xl font-bold font-playfair-display">Asamankese Ward</h1>
                <p className="text-lg">{ currentDate }</p>
            </div>
            <div className="w-full lg:w-auto">
              <NavLinks />
            </div>
          </div>
         
    </header>
  );
}