describe('My birthday reminder app', () => {
    it('should look correctly', async () => {
        await browser.url(`http://localhost:3000/`);
        await browser.execute('/*@visual.init*/', 'Birthday Reminder App');
        await browser.execute('/*@visual.snapshot*/', 'Default State');

        await $('[data-testid="clear"]').click();
        await browser.execute('/*@visual.snapshot*/', 'Clear State');

        const result = await browser.execute('/*@visual.end*/');
        expect(result.message).toBeNull();
    });
});
