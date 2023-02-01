module.exports = {
	apps: [
		{
			name: "ExercisesServer",
			cwd: "./apps/server",
			script: "yarn",
			args: ["start"],
			interpreter: '/bin/bash',
			autorestart: true,
			max_memory_restart: "1G",
		},
		{
			name: "ExercisesClient",
			cwd: "./apps/client",
			script: "yarn",
			args: ["start"],
			interpreter: '/bin/bash',
			autorestart: true,
			max_memory_restart: "1G",
		}
	],
};