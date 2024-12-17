import * as fs from "fs";
import * as path from "path";
import * as vscode from "vscode";
var jsonSchemaGenerator = require("json-schema-generator");

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand("smart-json-schema.create-json-schema", async () => {
    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (!workspaceFolders) {
      vscode.window.showErrorMessage("No workspace is open.");
      return;
    }

    const workspacePath = workspaceFolders[0].uri.fsPath;

    const options: vscode.OpenDialogOptions = {
      canSelectMany: false,
      openLabel: "Open",
      filters: {
        "JSON files": ["json"],
        "All files": ["*"],
      },
      defaultUri: vscode.Uri.file(workspacePath),
    };

    const fileUri = await vscode.window.showOpenDialog(options);

    if (!fileUri || fileUri.length === 0) {
      vscode.window.showInformationMessage("No file selected.");
      return;
    }

    const filePath = fileUri[0].fsPath;
    let fileContent: string;
    try {
      fileContent = fs.readFileSync(filePath, "utf8");
    } catch (err) {
      vscode.window.showErrorMessage("Error reading the file.");
      console.error(err);
      return;
    }

    let json: any;
    try {
      json = JSON.parse(fileContent);
    } catch (err) {
      vscode.window.showErrorMessage("Error parsing JSON content.");
      console.error(err);
      return;
    }

    let schema: any;
    try {
      schema = jsonSchemaGenerator(json);
    } catch (err) {
      vscode.window.showErrorMessage("Error generating JSON schema.");
      console.error(err);
      return;
    }

    const config = vscode.workspace.getConfiguration("smartJsonSchema");
    let saveDirectory = config.get<string>("defaultFolder", "");
    if (!saveDirectory) {
      vscode.window.showErrorMessage("Save directory not configured.");
      return;
    }

    saveDirectory = saveDirectory.replace(/[/\\]$/, "");

    const fullSavePath = path.join(workspacePath, saveDirectory);

    if (!fs.existsSync(fullSavePath)) {
      fs.mkdirSync(fullSavePath, { recursive: true });
    }

    const originalFileName = path.basename(filePath);
    let filePrefix = config.get<string>("defaultFilePrefix", "");
    const newFileName = `${filePrefix}${originalFileName}`;
    const newFilePath = path.join(fullSavePath, newFileName);

    try {
      fs.writeFileSync(newFilePath, JSON.stringify(schema, null, 2), "utf8");
      vscode.window.showInformationMessage(`Schema saved as: ${newFilePath}`);
    } catch (err) {
      vscode.window.showErrorMessage("Error writing schema to file.");
      console.error(err);
    }
  });

  context.subscriptions.push(disposable);

  let disposableContextMenu = vscode.commands.registerCommand("smart-json-schema.create-json-schema-here", async (uri: vscode.Uri) => {
    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (!workspaceFolders) {
      vscode.window.showErrorMessage("No workspace is open.");
      return;
    }

    let fileContent: string;
    try {
      fileContent = fs.readFileSync(uri.fsPath, "utf8");
    } catch (err) {
      vscode.window.showErrorMessage("Error reading the file.");
      console.error(err);
      return;
    }

    let json: any;
    try {
      json = JSON.parse(fileContent);
    } catch (err) {
      vscode.window.showErrorMessage("Error parsing JSON content.");
      console.error(err);
      return;
    }

    let schema: any;
    try {
      schema = jsonSchemaGenerator(json);
    } catch (err) {
      vscode.window.showErrorMessage("Error generating JSON schema.");
      console.error(err);
      return;
    }

    const baseDir = path.dirname(uri.fsPath);
    const originalFileName = path.basename(uri.fsPath);

    const config = vscode.workspace.getConfiguration("smartJsonSchema");
    let filePrefix = config.get<string>("defaultFilePrefix", "");

    const newFileName = `${filePrefix}${originalFileName}`;
    const newFilePath = path.join(baseDir, newFileName);

    try {
      fs.writeFileSync(newFilePath, JSON.stringify(schema, null, 2), "utf8");
      vscode.window.showInformationMessage(`Schema saved as: ${newFilePath}`);
    } catch (err) {
      vscode.window.showErrorMessage("Error writing schema to file.");
      console.error(err);
    }
  });

  context.subscriptions.push(disposableContextMenu);
}

export function deactivate() {}
