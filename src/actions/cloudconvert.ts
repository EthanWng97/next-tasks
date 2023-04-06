import CloudConvert from "cloudconvert";
import envs from "@/envs";

const cloudConvert = new CloudConvert(envs.value.cloudconvert.api_key);

export const convertFile = async (
  inputFileName: string,
  inputFileContent: string,
  outputFileName: string
) => {
  try {
    let job = await cloudConvert.jobs.create({
      tasks: {
        "import-my-file": {
          operation: "import/raw",
          file: inputFileContent,
          filename: inputFileName,
        },
        "convert-my-file": {
          operation: "convert",
          input: "import-my-file",
          output_format: "epub",
          filename: outputFileName,
        },
        "export-my-file": {
          operation: "export/url",
          input: "convert-my-file",
        },
      },
    });
    job = await cloudConvert.jobs.wait(job.id);
    const file = cloudConvert.jobs.getExportUrls(job)[0];
    return file;
  } catch (error) {
    console.error("Error converting file:", error);
    return null;
  }
};
