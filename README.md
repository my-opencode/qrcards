# qrcard
Electron App to create Qr Code based Vcards

# License

©2023 Ludovic Antérieur
Any use is permitted except for providing commercial qr card creation services.
You may use this app to create cards for your own company, but you may not sell this as a service.

# Start program

Open the setup file located in `IT/QrVcards` with the name `qrcards.[version] Setup.exe`.
At time of writing it will open once, then close, then restart. Wait for the restart.

# Shortcut cheat list

| Shortcut | Action |
|-|-|
| Ctrl + o | Open Data file |
| Ctrl + s | Save Data file |
| Alt + y | Open Styler Window |
| Alt + 1 | Open Simple Qr Window |
| Alt + 2 | Open Single Vcard Qr Window |
| Alt + 3 | Open Batch Qr Vcards Window |

# Save / Load data

## What's in data

- qr color style
- qr text style
- qr logo
- qr design style
- batch QrVcards company information
- batch QrVcards employees' information

## Load

Use the keyboard shortcut `Ctrl + O` or use the application menu: `File > Load`.
Select the JSON file to load.
A user message will inform you of a successful loading.

## Save

At any time, use the keyboard shortcut `Ctrl + s` or use the application menu: `File > Save`.
Select the location to save the JSON file.
A user message will inform you of a successful save.

# Set Qr Style

The qr style is set from a dedicated page.
Use the keyboard shortcut `Alt + y` or use the application menu: `Edit > Style`.

Style is split into 4 sections:
- Color
- Text
- Logo
- Sprite / Design

Each changes must be "saved" separately to be applied.
Saved styles are not saved to file. Save data to file to save style changes.

## Colors

Color can be set for:
- qr dots.
- background.

Additionnaly color can be set for two zones of the qr dots (instead of using dot color):
- the eyes.
- the irises. (Inner parts of the eyes)

Use the color pickers.
Save to apply.

## Text

Only applicable to Vcard Qr codes.

QrVcard may display the name of the person. The name appears at the bottom of the card.

Editable styles:
- font type (serif or sans-serif).
- font color.
- font size. (pixels).
- disable text.

Save to apply.

## Logo

Qr codes may display a Logo at their center.
The logo will be resized to be small.

You may upload a logo image. We recommend using a non transparent image with the same background color as that of the Qr Code.

The logo will be saved as base64 encoded image inside the data file when saved.

Save to apply.

## Sprites / Design

Qr Dots can be customized with sprites.
- Select a dot style in the list. Default is square.

Additionnaly, styles for eyes and irises can be set to override the dot style.
- Select an eye style if needed.
- Select an iris style if needed.

Save to apply.

## Save to file

After significant changes, we recommend saving to file.

## Test styles

You may use the simple Qr code generator to test your style choices.

# Simple Qr

Use the keyboard shortcut `Alt + 1` or use the application menu `Window > Simple Qr` to open the window.

Enter the content of the qr into the text box.
Click Generate to generate and display the Qr code.
Scan with your phone to test.
Click download to download as a png.

# Single Vcard Qr

Use the keyboard shortcut `Alt + 2` or use the application menu `Window > Single Vcard Qr` to open the window.

Fill the Vcard form. (Names, Surnames, Full Name and Address are required).
Click Generate to generate and display the Qr code.
Scan with your phone to test.
Click download to download as a png.

# Batch Qr Vcards

When data has been loaded, forms should come prefilled with saved data.

## Company Contact

Unwrap the Company Contact section to reveal the Company Information form.

## Employees

Unwrap the Employees section to reveal the Employees' information form.

Use the `Add row` button to add a row to the data table.

Use the `X` button in the right most `Actions` column to delete a row of the data table.

Fill the employee information for each row.

Use the left most Select column to select which row to generate and download QrVcards.
Use the `Select all` checkbox on the header row to select all rows at once.

## Generate and Download

Use the `Generate Vcards` button to generate Qr Vcards for all selected employees.

Use the `Download Vcards` button to download all generated cards in one zip file.
Select the location to save the zip file.

The zip files contains a `images` folder with all QrVcards as Pngs.
