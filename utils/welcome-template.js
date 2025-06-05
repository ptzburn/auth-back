export const welcomeTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
  <title>Welcome</title>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <style>
    * {
      box-sizing: border-box;
    }
    body {
      margin: 0;
      padding: 0;
    }
    a[x-apple-data-detectors] {
      color: inherit !important;
      text-decoration: inherit !important;
    }
    #MessageViewBody a {
      color: inherit;
      text-decoration: none;
    }
    p {
      line-height: inherit;
      margin: 0;
    }
    .desktop_hide {
      mso-hide: all;
      display: none;
      max-height: 0;
      overflow: hidden;
    }
    @media (max-width: 600px) {
      .row-content {
        width: 100% !important;
      }
      .stack .column {
        width: 100%;
        display: block;
      }
      .desktop_hide {
        display: table !important;
        max-height: none !important;
      }
      .row-1 .column-1 .block-1.heading h1,
      .row-1 .column-1 .block-2.paragraph td.pad > div,
      .row-1 .column-1 .block-3.button .alignment {
        text-align: center !important;
      }
      .row-1 .column-1 .block-1.heading h1 {
        font-size: 24px !important;
      }
      .row-1 .column-1 .block-2.paragraph td.pad > div {
        font-size: 14px !important;
      }
      .row-1 .column-1 .block-3.button span {
        font-size: 14px !important;
        line-height: 28px !important;
      }
      .row-1 .column-1 {
        padding: 24px !important;
      }
      .row-2 .column-1 {
        padding: 16px 16px 24px !important;
      }
    }
  </style>
</head>
<body style="background-color: #f8f8ff; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
<table border="0" cellpadding="0" cellspacing="0" class="nl-container" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f8f8ff;" width="100%">
  <tbody>
    <tr>
      <td>
        <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
          <tbody>
            <tr>
              <td>
                <table align="center" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff; color: #333; width: 767px; margin: 0 auto;" width="767">
                  <tbody>
                    <tr>
                      <td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: center; padding: 48px; vertical-align: top;" width="100%">
                        <table border="0" cellpadding="0" class="heading block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
                          <tr>
                            <td class="pad" style="padding-top: 12px;">
                              <h1 style="margin: 0; color: #292929; font-family: 'Arial', sans-serif; font-size: 32px; font-weight: 500; line-height: 1.2;">Welcome</h1>
                            </td>
                          </tr>
                        </table>
                        <table border="0" cellpadding="0" class="paragraph block-2" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
                          <tr>
                            <td class="pad" style="padding: 16px 0;">
                              <div style="color: #333; font-family: 'Arial', sans-serif; font-size: 16px; font-weight: 400; line-height: 1.5;">
                                <p>We are glad you have decided to join us. To unlock the full potential of your new account, please activate it by clicking the link below.</p>
                              </p>
                            </td>
                          </tr>
                        </table>
                        <table border="0" cellpadding="0" class="button block-3" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
                          <tr>
                            <td class="pad" style="padding-top: 16px;">
                              <div class="alignment">
                                <a href="http://localhost:5173/" style="background-color: #7259ff; border-radius: 4px; color: #fff; display: inline-block; font-family: 'Arial', sans-serif; font-size: 16px; font-weight: normal; padding: 12px 24px; text-align: center; text-decoration: none;" target="_parent">Activate Your Account</a>
                              </div>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
        <table align="center" border="0" cellpadding="0" class="row row-2" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
          <tbody>
            <tr>
              <td>
                <table align="center" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f8f8ff; color: #333; width: 767px; margin: 0 auto;" width="767">
                  <tbody>
                    <tr>
                      <td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: center; padding: 32px 48px 48px; vertical-align: top;" width="100%">
                        <table border="0" cellpadding="10" class="divider block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
                          <tr>
                            <td class="pad">
                              <div class="alignment">
                                <table border="0" cellpadding="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="50%">
                                  <tr>
                                    <td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 1px solid #ccc;"><span style="word-break: break-word;"> </span></td>
                                  </tr>
                                </table>
                              </div>
                            </td>
                          </tr>
                        </table>
                        <table border="0" cellpadding="0" class="paragraph block-2" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
                          <tr>
                            <td class="pad" style="padding-top: 16px;">
                              <div style="color: #666; font-family: 'Arial', sans-serif; font-size: 12px; font-weight: 400; line-height: 1.5;">
                                <p>You received this email because you signed up to <a href="http://localhost:5173/" rel="noopener" style="color: #7259ff; text-decoration: underline;" target="_parent">our site</a>.</p>
                              </div>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>
</body>
</html>
`;
