const manageTranslations = require('react-intl-translations-manager').default;

manageTranslations({
    messagesDirectory: 'target/intl/extracted-messages',
    translationsDirectory: 'src/messages',
    singleMessagesFile: true,
    languages: ['en', 'ru']
});