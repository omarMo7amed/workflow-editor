export default function x() {
    return   Component Architecture
    <motion.section
      id="components"
      className="py-24 px-6"
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      variants={staggerContainer}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div className="text-center mb-16" variants={fadeInUp}>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Component Hierarchy
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Modular architecture designed for scalability and maintainability
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={staggerContainer}
        >
          {/* {components.map((component, index) => (
            <motion.div
              key={component.name}
              className={`bg-gradient-to-br ${component.color} p-8 rounded-2xl text-white relative overflow-hidden group hover:scale-105 transition-transform duration-300`}
              variants={fadeInUp}
              whileHover={{ y: -5 }}
            >
              <div
                className={`absolute top-4 right-4 w-3 h-3 ${component.accent} rounded-full`}
              />

              <div className="mb-6">{component.icon}</div>

              <h3 className="text-2xl font-bold mb-4">{component.name}</h3>

              <p className="text-slate-300 leading-relaxed">
                {component.description}
              </p>

              <motion.div
                className="absolute -bottom-16 -right-16 w-32 h-32 bg-white/5 rounded-full"
                animate={{ rotate: 360 }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            </motion.div>
          ))} */}
        </motion.div>
      </div>
    </motion.section>

    {/* Data Flow */}
    <motion.section
      id="data-flow"
      className="py-24 px-6 bg-slate-900"
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      variants={staggerContainer}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div className="text-center mb-16" variants={fadeInUp}>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Data Flow Architecture
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Seamless data management and state synchronization
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={staggerContainer}
        >
          {dataFlow.map((item, index) => (
            <motion.div
              key={item.name}
              className="bg-slate-800 border border-slate-700 p-6 rounded-xl hover:bg-slate-750 transition-colors duration-300"
              variants={fadeInUp}
              whileHover={{ scale: 1.02 }}
            >
              <div className="text-slate-400 mb-4">{item.icon}</div>

              <h3 className="text-lg font-semibold text-white mb-2">
                {item.name}
              </h3>

              <p className="text-slate-400 text-sm leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>

    {/* Key Interactions */}
    <motion.section
      id="interactions"
      className="py-24 px-6"
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      variants={staggerContainer}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div className="text-center mb-16" variants={fadeInUp}>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Key Interactions
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Intuitive user experience through thoughtful interaction design
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={staggerContainer}
        >
          <motion.div
            className="bg-white p-8 rounded-2xl shadow-lg border border-slate-200"
            variants={fadeInUp}
            whileHover={{
              y: -5,
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
            }}
          >
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              Canvas Interactions
            </h3>
            <p className="text-slate-600 mb-6">
              Zooming, panning, and grid management within the WorkflowEditor
              component for precise workflow creation.
            </p>
            <div className="flex items-center text-slate-500">
              <Workflow className="w-5 h-5 mr-2" />
              <span className="text-sm">Real-time canvas updates</span>
            </div>
          </motion.div>

          <motion.div
            className="bg-white p-8 rounded-2xl shadow-lg border border-slate-200"
            variants={fadeInUp}
            whileHover={{
              y: -5,
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
            }}
          >
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              Node Connections
            </h3>
            <p className="text-slate-600 mb-6">
              Real-time updates and dynamic edge connections managed by React
              Flow for seamless workflow building.
            </p>
            <div className="flex items-center text-slate-500">
              <GitBranch className="w-5 h-5 mr-2" />
              <span className="text-sm">Dynamic connection system</span>
            </div>
          </motion.div>

          <motion.div
            className="bg-white p-8 rounded-2xl shadow-lg border border-slate-200"
            variants={fadeInUp}
            whileHover={{
              y: -5,
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
            }}
          >
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              Execution Engine
            </h3>
            <p className="text-slate-600 mb-6">
              Determines optimal node execution order using topological sort
              based on workflow dependencies.
            </p>
            <div className="flex items-center text-slate-500">
              <Zap className="w-5 h-5 mr-2" />
              <span className="text-sm">Intelligent execution flow</span>
            </div>
          </motion.div>

          <motion.div
            className="bg-white p-8 rounded-2xl shadow-lg border border-slate-200"
            variants={fadeInUp}
            whileHover={{
              y: -5,
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
            }}
          >
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              OpenAI Integration
            </h3>
            <p className="text-slate-600 mb-6">
              Advanced PDF text extraction and AI-powered summarization for
              intelligent document processing.
            </p>
            <div className="flex items-center text-slate-500">
              <Brain className="w-5 h-5 mr-2" />
              <span className="text-sm">AI-powered processing</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>

}