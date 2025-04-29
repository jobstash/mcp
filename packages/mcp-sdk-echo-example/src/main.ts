import { McpServer, ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { z } from "zod";
import { spawn } from 'child_process';
import path from 'path';

// --- Server Definition ---
function createEchoServer() {
    const server = new McpServer({
        name: "Echo",
        version: "1.0.0"
    });

    server.resource(
        "echo",
        new ResourceTemplate("echo://{message}", { list: undefined }),
        async (uri, { message }) => ({
            contents: [{
                uri: uri.href,
                text: `Resource echo: ${message}`
            }]
        })
    );

    server.tool(
        "echo",
        { message: z.string() },
        async ({ message }) => ({
            content: [{ type: "text", text: `Tool echo: ${message}` }]
        })
    );

    server.prompt(
        "echo",
        { message: z.string() },
        ({ message }) => ({
            messages: [{
                role: "user",
                content: {
                    type: "text",
                    text: `Please process this message: ${message}`
                }
            }]
        })
    );

    return server;
}

// --- Server Runner ---
async function runServer() {
    console.log("Starting MCP Echo Server...");
    const server = createEchoServer();
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.log("Echo Server connected via stdio. Waiting for client...");
    // Keep the server running until the transport is closed
    await new Promise<void>(resolve => transport.onclose = resolve);
    console.log("Echo Server transport closed.");
}

// --- Client Runner ---
async function runClient() {
    console.log("Starting MCP Echo Client...");

    // Determine the command to run the server
    // Check if running via ts-node or as compiled JS
    const isTsNode = process.execArgv.some(arg => arg.includes('ts-node'));
    const command = process.execPath; // Path to node executable
    
    // Construct arguments including the loader if running with ts-node
    const args = isTsNode
        ? ['--loader', 'ts-node/esm', path.join(__dirname, 'main.ts'), '--server'] // Use ts-node with loader
        : [path.join(__dirname, 'main.js'), '--server']; // Use compiled path if not ts-node

    console.log(`Spawning server process: ${command} ${args.join(' ')}`);

    // Spawn server process (inheriting stderr for visibility)
    const serverProcess = spawn(command, args, {
        stdio: ['pipe', 'pipe', 'inherit'] // pipe stdin/stdout, inherit stderr
    });

    // Create client transport
    const transport = new StdioClientTransport({
        command: command,
        args: args,
    });

    const client = new Client({
        name: "echo-example-client",
        version: "1.0.0"
    });

    try {
        console.log("Connecting client to server...");
        await client.connect(transport);
        console.log("✓ Client connected!");

        // 1. List Tools
        console.log("Listing tools...");
        const tools = await client.listTools();
        console.log("Available tools:", tools);

        // 2. Call Tool
        const toolMessage = "Hello from Client Tool!";
        console.log(`Calling 'echo' tool with message: "${toolMessage}"`);
        const toolResult = await client.callTool({
            name: "echo",
            arguments: { message: toolMessage }
        });
        if (toolResult.content && Array.isArray(toolResult.content) && toolResult.content[0]?.type === 'text') {
             console.log("✓ Tool Response:", toolResult.content[0].text);
        } else {
             console.warn("Unexpected tool response format:", toolResult);
        }


        // 3. List Resources
        console.log("Listing resources...");
        const resources = await client.listResources();
        console.log("Available resources:", resources);


        // 4. Read Resource
        const resourceMessage = "Hello from Client Resource!";
        const resourceUri = `echo://${encodeURIComponent(resourceMessage)}`;
        console.log(`Reading resource: ${resourceUri}`);
        const resourceResult = await client.readResource({
            uri: resourceUri
        });
         if (resourceResult.contents?.[0]) {
             console.log("✓ Resource Response:", resourceResult.contents[0].text);
        } else {
             console.warn("Unexpected resource response format:", resourceResult);
        }

        console.log("Client finished successfully.");

    } catch (error) {
        console.error("⚠ Client Error:", error);
        process.exitCode = 1;
    } finally {
        console.log("Shutting down server process...");
         if (serverProcess && !serverProcess.killed) {
            serverProcess.kill();
        }
        // Ensure client transport is closed
        // client.close() handles cases where it might not be connected or already closed
        client.close();

        // Short delay to allow process termination
        await new Promise(resolve => setTimeout(resolve, 200));
    }
}

// --- Main Execution Logic ---
async function main() {
    // Check if --server flag is present
    if (process.argv.includes('--server')) {
        await runServer();
    } else {
        await runClient();
    }
}

main().catch(error => {
    console.error('Unhandled error in main:', error);
    process.exit(1);
}); 