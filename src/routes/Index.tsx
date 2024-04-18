import AddTask from "../components/AddTask";

const Index = () => {
	return (
		<main className="container mx-auto">
			<section className="max-w-5xl mx-auto m-12 p-16">
				<h1 className="text-4xl md:text-7xl font-bold text-center py-3 mb-16">
					AI-enhanced, Voice-enabled, Searchable Task Manager
				</h1>
				<AddTask />
			</section>
		</main>
	);
};

export default Index;