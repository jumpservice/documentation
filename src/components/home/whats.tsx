import { ImageComponent } from "../public";

function WhatsJumpServer() {
  return (
    <>
      <div className="">
        <section>
          <h2>JumpServer Architecture</h2>
          <ImageComponent
            src="/images/jumpserver-overview.png"
            alt="jumpserver-overview"
            width={1000}
            height={800}
          />
        </section>
      </div>
    </>
  );
}

export default WhatsJumpServer;
