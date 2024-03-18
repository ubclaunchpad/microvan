/**
 * This function is used as a trigger for AWS Cognito's Custom Message trigger.
 */
exports.cognitoCustomMessageHandler = async (event, context) => {
    if (event.triggerSource === "CustomMessage_SignUp") {
        const firstName = event.request.userAttributes["given_name"];

        const emailContent = `
          <html>
              <head>
                  <style>
                      @font-face {
                          font-family: "Poppins", Arial, Helvetica, sans-serif;
                          font-style: normal;
                          font-weight: 400;
                          src: url("https://fonts.googleapis.com/css2?family=Poppins:wght@400&display=swap") format("woff2");
                      }
                      .body-style {
                          background-color: #fff;
                          padding: 129px 119px 119px 120px;
                      }
                      h1 {
                          color: #236f41;
                          font-size: 50px;
                          font-style: normal;
                          font-weight: 700;
                          line-height: 60px;
                      }
                      .row-table {
                          width: 100%;
                          border-spacing: 0;
                          margin-bottom: 100px;
                      }
                      .image-cell {
                          padding-right: 56px;
                          text-align: center;
                          vertical-align: middle;
                          width: 126px;
                      }
                      .text-cell {
                          vertical-align: middle;
                          text-align: left;
                      }
                      .header-text {
                          font-size: 50px;
                          margin-top: 0;
                          margin-bottom: 0;
                          padding-top: 5px;
                      }
                      p {
                          font-size: 20px;
                          color: #4b4b4b;
                          font-style: normal;
                          font-weight: 400;
                          line-height: normal;
                      }
                      .button-container {
                          text-align: center;
                          cursor: pointer;
                          align-items: center;
                          width: 231px;
                          height: 74px;
                          margin-top: 48px;
                          margin-bottom: 35px;
                      }
                      .button-link {
                          display: inline-block;
                          width: 231px;
                          height: 74px;
                          line-height: 74px;
                          border-radius: 10px;
                          background-color: #236f41;
                          color: #ffffff;
                          text-align: center;
                          text-decoration: none;
                          font-size: 18px;
                          font-weight: 600;
                      }
                      .link {
                          color: #236f41;
                          font-size: 20px;
                          font-style: normal;
                          font-weight: 400;
                          line-height: normal;
                          text-decoration-line: underline;
                      }
                      h2 {
                          margin-top: 75px;
                          color: #4b4b4b;
                          font-size: 35px;
                          font-style: normal;
                          font-weight: 700;
                          line-height: normal;
                      }
                      b {
                          font-weight: 700;
                      }
                  </style>
              </head>
              <body>
                  <div class="body-style">
                      <table class="row-table">
                          <tr>
                              <td class="image-cell">
                                  <img
                                      src="https://microvan-email-images.s3.ap-southeast-1.amazonaws.com/microvan_logo.png"
                                      alt="Microvan Inc"
                                      width="126"
                                      height="126"
                                  />
                              </td>
                              <td class="text-cell">
                                  <h1 class="header-text">Verify Your<br />Microvan Inc. Account</h1>
                              </td>
                          </tr>
                      </table>
                      <p>
                          Hi ${firstName},<br /><br />
                          Click the button below to verify your account. Verifying your account means that you agree to our Terms
                          and Conditions.
                      </p>
                      <div class="button-container">
                          <a href="{####}" class="button-link">Click here to verify</a>
                      </div>
                      <p>
                          If the button does not work, use this link or copy this link into your browser: <br /><a
                              href="{####}"
                              class="link"
                              >{####}</a
                          >
                      </p>

                      <h2>Some Notes:</h2>
                      <p>
                          Before participating in <b>each</b> auction, you must upload <b>proof of deposit of ₱100,000</b> to our
                          web page.
                          <b>Please have your scan of your proof of deposit document ready before registering online.</b> You will
                          receive a notification via email and within our virtual auctions website when your deposit has been
                          approved by a member of our staff.
                      </p>

                      <img
                          src="https://microvan-email-images.s3.ap-southeast-1.amazonaws.com/about-me-logo.png"
                          alt="Microvan Inc"
                          width="369"
                          height="277"
                      />

                      <p style="margin-top: 67px;">Happy Bidding,<br />Microvan Inc. Team</p>

                      <p style="margin-top: 100px;">© Microvan Inc. 2024</p>
                  </div>
              </body>
          </html>
    `;

        event.response.emailSubject = "Microvan Inc. Email Verification";
        event.response.emailMessage = emailContent;
    }

    return event;
};
