export default function NodeConnections({
  changeConnections,
}: {
  changeConnections: () => void;
}) {
  //here i have a big logic on my head , damn🥲
  const graph = [
    {
      read: ["summary", "report", "sendEmail"],
    },
    {
      summary: ["sendEmail", "report"],
    },
    {
      sendEmail: ["report"],
    },
    {
      report: ["sendEmail"],
    },
  ];

  return (
    <>
      <h3 className="text-lg font-semibold text-gray-700 mb-4">
        Node Connections
      </h3>
      <div className="connections  mb-4 text-gray-600 text-sm">
        <p className="mb-2">
          Previous Node:{" "}
          <span className="font-semibold" id="prevNode">
            None
          </span>
        </p>
        <p>
          Next Node:{" "}
          <span className="font-semibold" id="nextNode">
            None
          </span>
        </p>
        <button
          className="mt-4 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 text-sm"
          onClick={changeConnections}
        >
          Change Connections
        </button>
      </div>
    </>
  );
}
