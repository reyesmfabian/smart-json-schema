# **Smart JSON Schema Generator**

**Smart JSON Schema** is a Visual Studio Code extension designed to simplify the generation of JSON schemas from existing JSON files. This tool is perfect for developers working with APIs, configurations, and structured data, allowing them to quickly and efficiently create JSON schemas.

## **Features**

* **JSON Schema Generation** : Automatically generates JSON schemas from any selected JSON file.
* **Custom Configuration** : Allows you to configure the directory where the generated schemas are saved using the **smartJsonSchema.defaultFolder** setting.
* **Custom File Prefix** : Allows you to configure the prefix for the generated schema files using the **smartJsonSchema.defaultFilePrefix** setting.
* **Seamless Integration** : Integrates perfectly with Visual Studio Code, providing a smooth and consistent user experience.
* **Support for Nested Directories** : Automatically creates nested directories specified in the configuration, ensuring that your JSON schemas are saved in the desired structure.

## **How to Use**

### Command Palette

1. **Open a Project** : Open your project in Visual Studio Code.
2. **Run the Command** : Run the **Create JSON Schema** command from the command palette (Ctrl+Shift+P or Cmd+Shift+P) to open a JSON file.
3. **Select the JSON File** : Select the JSON file from which you want to generate a schema.
4. **Save the Schema** : The generated JSON schema will be automatically saved in the configured directory (default is **schemas**), with the specified prefix followed by the original file name.

### Contextual Menu

1. **Open a Project** : Open your project in Visual Studio Code.
2. **Select the JSON File** : Select the JSON file from which you want to generate a schema.
3. **Generate the Schema:** Right click on the JSON file and select the **Create JSON Schema Here command.**
4. **Final:** The schema file will be generated together with the original JSON file.

## **Configuration**

To configure the directory where the generated schemas are saved and the prefix for the schema files, add the following settings to your **settings.json**:

```json
{
  "smartJsonSchema.defaultFolder": "path/to/your/directory",
  "smartJsonSchema.defaultFilePrefix": "your-prefix-"
}
```

## **Usage Example**

* **If you set smartJsonSchema.defaultFolder** to **schemas**, the generated schemas will be saved in the **[project_path]/schemas/** directory.**
* ****If you set smartJsonSchema.defaultFilePrefix** to **schema-**, the generated files will be named like **schema-originalfilename.json**.**
