import CloudConvert from "cloudconvert";

const CLOUDCONVERT_API_KEY: string = process.env.CLOUDCONVERT_API_KEY || "";

const cloudConvert = new CloudConvert(CLOUDCONVERT_API_KEY);

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
