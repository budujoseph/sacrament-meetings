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
          <div className="flex justify-center items-center">
            <div className="container mx-auto">
                <h1 className="text-2xl font-bold font-playfair-display">Asamankese Ward</h1>
                <p className="text-lg">{ currentDate }</p>
            </div>
            <div>
              <NavLinks />
            </div>
          </div>
         
    </header>
  );
}