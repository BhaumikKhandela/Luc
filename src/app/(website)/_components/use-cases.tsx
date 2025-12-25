export const UseCases = () => {
  return (
    <section>
      <div>
        <h2 className="text-5xl text-[#cacaca] font-bold my-2 flex justify-center">
          Video messaging for all use cases
        </h2>
      </div>
      <div className="flex gap-10 mx-10 py-28">
        {useCases.map((useCase) => (
          <div className=" bg-[#262626] p-10 rounded-xl" key={useCase.id}>
            <div>
              <img src={useCase.image} className="rounded-xl" />
            </div>
            <div className="flex flex-col justify-center items-center  py-2">
              <h3 className="font-semibold text-2xl pt-5">{useCase.name}</h3>
              <p className="py-5 text-center">{useCase.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const useCases = [
  {
    id: 1,
    name: "Sales",
    description:
      "Personalize your pitch with video outreach to close more deals.",
    image: "/sales.png",
  },
  {
    id: 2,
    name: "Engineering",
    description: "Add visual context to your code to accelerate your sprints.",
    image: "/engineering.png",
  },
  {
    id: 3,
    name: "Custom Support",
    description: "Troubleshoot over video to reach resolution faster.",
    image: "/sharing.png",
  },
  {
    id: 4,
    name: "Design",
    description:
      "Share your ideas and provide feedback over video to enhance designs.",
    image: "/design.png",
  },
];
