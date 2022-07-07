import { html } from 'https://unpkg.com/lit-html?module';

import { getCarById, deleteCarById } from '../src/api/data.js';

const detailsTemplate = (car, onDelete, isOwner) => html`
<section class="details">
    <div>
        <h1>Car details</h1>
    </div>

    <div class="my-details">
        <img src=${car.imageUrl} alt="car">
        <p><span>${car.brand} ${car.model}</span></p>
        <p><span>Production year: ${car.year}</span></p>
        <p>Price: <span>${car.price} lv</span></p>
        ${isOwner ? html`
        <a class="in-details" href='/edit/${car.objectId}'>Edit</a>
        <a @click=${onDelete} class="in-details" href=javascript:void(0)>Delete</a>` : ''}

    </div>
</section>`;

export async function detailsPage(ctx) {
    const carId = ctx.params.id;
    const userId = sessionStorage.getItem('userId');

    const car = await getCarById(carId);

    ctx.render(detailsTemplate(car, onDelete, userId == car.owner.objectId))

    async function onDelete() {
        const confirmed = confirm('Are you sure?');
        if (confirmed) {
            await deleteCarById(carId);
            ctx.page.redirect('/allCars');
        }
    }
}