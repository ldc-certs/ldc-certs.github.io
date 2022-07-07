import { html } from 'https://unpkg.com/lit-html?module';

import { getCarsByOwner } from '../src/api/data.js';


const myCarsTemplate = (data) => html`
<section class="my-cars">
    <h1>My Cars</h1>
    <div class="my-collection">

        ${data.length ? html`${data.map(carTemplate)}` : html`<p class="no-cars">No cars in database.</p>`}

    </div>
</section>`;

const carTemplate = (car) => html`
<div>
    <p>${car.title}</p>
    <img alt="no-pic" src=${car.imageUrl}>
</div>
<div>
    <a class="btn" href="/details/${car.objectId}">Details</a>
</div>`;

export async function myCarsPage(ctx) {
    const ownerId = sessionStorage.getItem('userId');
    const [data] = await getCarsByOwner(ownerId);

    ctx.render(myCarsTemplate(data));
}