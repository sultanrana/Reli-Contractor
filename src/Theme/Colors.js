class ColorsTemplate {
    constructor(
        {
            background,
            backgroundInverse,
            primary,
            primaryOutline,
            secondary,
            text,
            textTitle,
            variation,
            BlackGreyish,
            dateBackground,
            border,
            red
        }
    ) {
        this.Background = background
        this.BackgroundInverse = backgroundInverse
        this.White = 'white'
        this.Black = 'black'
        this.Grey = '#808080'
        this.Primary = primary
        this.PrimaryOutline = primaryOutline
        this.Secondary = secondary
        this.Text = text
        this.TextTitle = textTitle
        this.Variation = variation,
            this.BlackGreyish = '#181725',
            this.Transparent = "rgba(0,0,0,0)",
            this.DateBackground = dateBackground,
            this.Border = border,
            this.Danger = red

    }
}

const lightColors = new ColorsTemplate({
    background: '#fafafa',
    backgroundInverse: 'black',
    primary: '#FDAA63',
    primaryOutline: '#F2F3F2',
    secondary: '#4C4F4D',
    text: '#212529',
    textTitle: 'black',
    variation: '#dc3545',
    dateBackground: '#E0E0E0',
    border: '#5F6368',
    red: '#BA1A1A'
})

const darkColors = new ColorsTemplate({
    background: 'black',
    backgroundInverse: 'white',
    primary: '#FDAA63',
    primaryOutline: 'grey',
    secondary: '#4C4F4D',
    text: '#212529',
    textTitle: '#ffffff',
    variation: '#FF685F',
    dateBackground: '#E0E0E0',
    border: '#5F6368',
    red: '#BA1A1A'


})

const Colors = (scheme) => {
    //console.log('Color Scheme ', scheme);
    return (scheme === 'light') ? lightColors : darkColors;
    //return darkColors
}

export default Colors

const colors = lightColors

export { colors }