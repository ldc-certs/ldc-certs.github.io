import { html } from 'https://unpkg.com/lit-html?module';

import { createParlour } from '../src/api/data.js';

const createTemplate = (onSubmit, isFilled) => html`
<section class="createCar">
    <div>
        <h1>Create New Parlour</h1>
        ${isFilled ? html`<p style="color: red">Please fill in all fields!</p>` : ''}

    </div>

    <form @submit=${onSubmit}>
        <div>
            <label for="new-parlour">Parlour Name</label>
            <input name="new-parlour" type="text">
            <label for="new-city">City</label>
            <input name="new-city" type="text">
            <label for="new-machine">Machine</label>
            <input name="new-machine" type="text">
            <label for="new-machineSN">Machine SN</label>
            <input name="new-machineSN" type="text">
            <label for="new-applicator">Applicator</label>
            <input name="new-applicator" type="text">
            <label for="new-applicatorSN">Applicator SN</label>
            <input name="new-applicatorSN" type="text">
            <label for="new-description">Description</label>
            <textarea name="new-description"></textarea>
            <input type="submit" value="Create">
        </div>
    </form>
</section>`;

export async function createPage(ctx) {
    ctx.render(createTemplate(onSubmit));

    async function onSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const parlour = {
            parlourName: formData.get('new-parlour'),
            city: formData.get('new-city'),
            machine: formData.get('new-machine'),
            machineSN: formData.get('new-machineSN'),
            applicator: formData.get('new-applicator'),
            applicatorSN: formData.get('new-applicatorSN'),
            description: formData.get('new-description')
        }

        if (!parlour.parlourName || !parlour.city || !parlour.machine || !parlour.machineSN || !parlour.applicator || !parlour.applicatorSN || !parlour.description) {
            return ctx.render(createTemplate(onSubmit, true))
        }

        await createParlour(parlour);
        event.target.reset();
        ctx.page.redirect('/allParlours');
    }
}
