import { EPub } from "@lesjoursfr/html-to-epub";
import CloudConvert from "cloudconvert";
import envs from "@/envs";

class FileConvertError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "FileConvertError";
  }
}

const isChinese = (char: string) => {
  const regex = /^[\u4E00-\u9FFF\u3400-\u4DFF]+$/;
  return regex.test(char);
};
const getLanguage = (title: string) => {
  const regex = /[^a-zA-Z\u4E00-\u9FFF\u3400-\u4DFF]/g;
  title = title.replace(regex, "");

  let chineseCount = 0;
  let englishCount = 0;
  for (let i = 0; i < title.length; i++) {
    const char = title.charAt(i);
    if (isChinese(char)) {
      chineseCount++;
    } else {
      englishCount++;
    }
  }
  return englishCount >= chineseCount ? "en" : "zh";
};
export const htmlToEpub = async (title: string, content: string) => {
  const options = {
    title: title,
    description: title,
    language: getLanguage(title),
    content: [
      {
        title: title,
        data: content,
        beforeToc: true,
      },
    ],
    tempDir: "/tmp",
  };
  const output = "/tmp/output.epub";
  const epub = new EPub(options, output);
  try {
    await epub.render();
    console.log("Ebook Generated Successfully!");
  } catch (err) {
    throw new FileConvertError(`Failed to convert file: ${err}`);
  }
};

const cloudConvert = new CloudConvert(envs.value.cloudconvert.api_key);

export const cloudConvertFile = async (
  inputFileName: string,
  inputFileContent: string,
  inputFileType: string,
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
          output_format: inputFileType,
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
