
const PreviewHtmlCode = ({htmlCode}) => {
  return (
    <div className="flex min-w-[300px] flex-col rounded-md bg-blue-200 p-2">
      <div dangerouslySetInnerHTML={{ __html: htmlCode }} />
    </div>
  );
}

export default PreviewHtmlCode