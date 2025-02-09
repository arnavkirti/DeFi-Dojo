export const InitialMessage = ({ content }: { content: string }) => {
    const extractYouTubeId = (url: string) => {
      const match = url.match(
        /(?:youtu\.be\/|youtube\.com\/(?:.*v=|.*\/|.*embed\/|.*v%3D|.*videos\/|.*watch\?v=))([\w-]{11})/
      );
      return match ? match[1] : null;
    };
  
    const youtubeRegex = /(https?:\/\/(?:www\.)?youtube\.com\/watch\?v=[\w-]+|https?:\/\/youtu\.be\/[\w-]+)/;
    const foundYouTubeLink = content.match(youtubeRegex);
    const youtubeId = foundYouTubeLink ? extractYouTubeId(foundYouTubeLink[0]) : null;
  
    return (
      <div className="bg-muted/20 p-5 rounded-lg shadow-md text-white max-w-[90%]">
        {content.split("\n").map((line, index) => {
          if (line.startsWith("###")) {
            // Section Headings (Gradient Effect)
            return (
              <h2
                key={index}
                className="text-lg font-semibold mt-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent"
              >
                {line.replace("### ", "")}
              </h2>
            );
          } else if (line.startsWith("**")) {
            // Bolded Highlights
            return (
              <p key={index} className="font-semibold text-primary mt-2">
                {line.replace(/\*\*/g, "")}
              </p>
            );
          } else if (line.startsWith("- ")) {
            // List Items with Bullet Styling
            return (
              <li key={index} className="ml-6 list-disc">
                {line.replace("- ", "")}
              </li>
            );
          } else if (line.includes("$")) {
            // Highlighted Price/Trade Calculations
            return (
              <p key={index} className="bg-primary/10 p-2 rounded-md mt-2">
                {line}
              </p>
            );
          } else if (line.includes("https://www.youtube.com") || line.includes("https://youtu.be")) {
            // YouTube Link Detected
            return null;
          } else {
            return <p key={index} className="mt-2">{line}</p>;
          }
        })}
  
        {/* YouTube Video Preview */}
        {youtubeId && (
          <div className="mt-4">
            <iframe
              className="w-full h-60 rounded-lg shadow-lg border border-primary/20"
              src={`https://www.youtube.com/embed/${youtubeId}`}
              title="YouTube Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        )}
      </div>
    );
  };
  