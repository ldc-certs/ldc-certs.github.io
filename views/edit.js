import { html } from 'https://unpkg.com/lit-html?module';

import { editParlourById, getParlourById } from '../src/api/data.js';

const editTemplate = (parlour, onSubmit, isFilled) => html`
<section class="createCar">
    <div>
        <h1>Edit Parlour</h1>
        ${isFilled ? html`<p>Please fill in all fields!</p>` : ''}

    </div>

    <form @submit=${onSubmit}>
        <div>
            <label for="new-parlour">Parlour Name</label>
            <input name="new-parlour" type="text" .value=${parlour.parlourName}>
            <label for="new-city">City</label>
            <input name="new-city" type="text" .value=${parlour.city}>
            <label for="new-machine">Machine</label>
            <input name="new-machine" type="text" .value=${parlour.machine}>
            <label for="new-machineSN">Machine SN</label>
            <input name="new-machineSN" type="text" .value=${parlour.machineSN}>
            <label for="new-applicator">Applicator</label>
            <input name="new-applicator" type="text" .value=${parlour.applicator}>
            <label for="new-applicatorSN">Applicator SN</label>
            <input name="new-applicatorSN" type="text" .value=${parlour.applicatorSN}>
            <label for="new-description">Description</label>
            <textarea name="new-description" .value=${parlour.description}></textarea>
            <input type="submit" value="Update">
        </div>
    </form>
</section>`;

export async function editPage(ctx) {
    const parlourId = ctx.params.id;
    const parlour = await getCarById(parlourId);
    ctx.render(editTemplate(parlour, onSubmit, false));

    async function onSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const data = {
            parlourName: formData.get('new-parlour'),
            city: formData.get('new-city'),
            machine: formData.get('new-machine'),
            machineSN: formData.get('new-machineSN'),
            applicator: formData.get('new-applicator'),
            applicatorSN: formData.get('new-applicatorSN'),
            description: formData.get('new-description')
        }

        if (!data.parlourName || !data.city || !data.machine || !data.machineSN || !data.applicator || !data.applicatorSN || !data.description) {
            return ctx.render(editTemplate(parlour, onSubmit, true));
        }

        await editParlourById(parlourId, data);
        event.target.reset();
        ctx.page.redirect(`allParlours`);
    }
}