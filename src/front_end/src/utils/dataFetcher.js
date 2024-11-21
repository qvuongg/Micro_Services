import Papa from "papaparse";

export const fetchCSVData = (filePath) => {
  return new Promise((resolve, reject) => {
    Papa.parse(filePath, {
      download: true,
      delimiter: ",",
      skipEmptyLines: true,
      header: true,
      complete: (result) => {
        const data = result.data;
        resolve(data);
      },
      error: (error) => {
        reject(error);
      },
    });
  });
};
