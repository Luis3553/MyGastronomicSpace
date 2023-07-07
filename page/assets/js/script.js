import Swal from '../../node_modules/sweetalert2/dist/sweetalert2.all.min.js';
import lapiz from '../imgs/lol3.png';
import deleteCan from '../imgs/lol2.png';
import btnOptionsImg from '../imgs/lol.png';
import deleteBtnImg from '../imgs/cancelar.png';
import addBtnIMg from '../imgs/boton-agregar.png';
import saveBtnImg from '../imgs/cheque.png';
import previewImgSrc from '../imgs/tenedor.png';

const page = document.querySelector('.page');
const body = document.querySelector('body');
const imgMovement = document.querySelectorAll('.guia');
const btnCreate = document.querySelector('.btn-create');
const btnListOfRecipes = document.querySelector('.btn-recipes');
const recipeContainer = document.createElement('div');
recipeContainer.classList.add('recipeContainer');

document.addEventListener('DOMContentLoaded', () => {
    imgMovement.forEach(image => {
        image.style.cssText = 'opacity: 1; left: 0px;';
    })
});
////////////////////////////////////////////////////////////////
function saveRecipesToLocalStorage() {
    const recipes = Array.from(recipeContainer.children);
    const savedRecipes = recipes.map((recipe) => {
        const name = recipe.name;
        const img = recipe.img;
        const description = recipe.description;
        const ingredients = recipe.ingredients;
        const preparation = recipe.preparation;
        return { name, img, description, ingredients, preparation };
    });
    localStorage.setItem('recipes', JSON.stringify(savedRecipes));
}
function loadRecipesFromLocalStorage() {
    const savedRecipes = JSON.parse(localStorage.getItem('recipes')) || [];
    savedRecipes.forEach((savedRecipe) => {
        const recipe = createRecipe(savedRecipe);
        recipe.description = savedRecipe.description;
        recipe.ingredients = savedRecipe.ingredients;
        recipe.preparation = savedRecipe.preparation;
        recipeContainer.append(recipe);
    });
}
loadRecipesFromLocalStorage();
////////////////////////////////////////////////////////////////
btnCreate.addEventListener('click', () => {
    let blackBkg = document.createElement('div');
    blackBkg.classList.add('blackBkg');
    body.insertAdjacentElement('afterbegin', blackBkg);

    let background = document.createElement('div');
    background.classList.add('bkg');
    page.append(background);

    // first cage //
    let firstCage = document.createElement('div');
    firstCage.classList.add('firstCage');
    let nameOfRecipe = document.createElement('h3');
    nameOfRecipe.textContent = 'Recipe name:';
    let inputNameOfRecipe = document.createElement('input');
    inputNameOfRecipe.type = 'text';
    inputNameOfRecipe.classList.add('inputName');
    inputNameOfRecipe.setAttribute('maxlength', '30');
    let bkgPreviewImage = document.createElement('div');
    bkgPreviewImage.classList.add('bkgPreviewImage');
    let previewImage = document.createElement('img');
    previewImage.src = previewImgSrc;
    previewImage.classList.add('previewImage');
    bkgPreviewImage.appendChild(previewImage);
    let descriptionHeader = document.createElement('h3');
    descriptionHeader.textContent = 'Description:';
    descriptionHeader.classList.add('space');
    let descriptionTextarea = document.createElement('textarea');
    descriptionTextarea.classList.add('DescpTextarea');
    let headerInputFile = document.createElement('h4');
    headerInputFile.textContent = 'Image(optional):';
    headerInputFile.classList.add('space');
    let inputFile = document.createElement('input');
    inputFile.type = 'file';
    inputFile.accept = 'image/*';
    inputFile.addEventListener('change', function (event) {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = function (e) {
            previewImage.src = e.target.result;
        };
        reader.readAsDataURL(file);
    });

    // second cage //
    let secondCage = document.createElement('div');
    secondCage.classList.add('secondCage');
    let ingredientsHeader = document.createElement('h3');
    ingredientsHeader.textContent = 'Ingredients:';
    let ingredientsTextarea = document.createElement('textarea');
    ingredientsTextarea.classList.add('CageTextarea');

    // third cage //
    let thirdCage = document.createElement('div');
    thirdCage.classList.add('thirdCage');
    let preparationHeader = document.createElement('h3');
    preparationHeader.textContent = 'Preparation:';
    let preparationTextarea = document.createElement('textarea');
    preparationTextarea.classList.add('CageTextarea');

    // delete btn //
    let deleteBtn = document.createElement('img');
    deleteBtn.classList.add('deleteBtn');
    deleteBtn.src = deleteBtnImg;
    deleteBtn.addEventListener('click', () => {
        blackBkg.remove();
        background.remove();
    });

    // add button //
    let addBtn = document.createElement('img');
    addBtn.classList.add('AddToRecipesBtn');
    addBtn.src = addBtnIMg;
    addBtn.addEventListener('click', () => {
        let values = {
            name: inputNameOfRecipe.value,
            img: previewImage.src,
            description: descriptionTextarea.value,
            ingredients: ingredientsTextarea.value,
            preparation: preparationTextarea.value
        };
        let recipe = createRecipe(values);
        addRecipeToContainer(recipe);
        saveRecipesToLocalStorage();
        blackBkg.remove();
        background.remove();
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
        })
        Toast.fire({
            icon: 'success',
            title: 'Recipe Added'
        });
    });

    firstCage.append(nameOfRecipe, inputNameOfRecipe, headerInputFile, bkgPreviewImage, inputFile, descriptionHeader, descriptionTextarea);
    secondCage.append(ingredientsHeader, ingredientsTextarea);
    thirdCage.append(preparationHeader, preparationTextarea);
    background.append(firstCage, secondCage, thirdCage, deleteBtn, addBtn);
});

function createRecipe(recipe) {
    let recipeId = Date.now().toString();

    let recipeBox = document.createElement('div');
    recipeBox.classList.add('recipe');
    recipeBox.name = recipe.name;
    recipeBox.img = recipe.img;
    recipeBox.description = recipe.description;
    recipeBox.ingredients = recipe.ingredients;
    recipeBox.preparation = recipe.preparation;

    let recipeBkg = document.createElement('div');
    recipeBkg.classList.add('recipeBkg');

    let recipeImg = document.createElement('img');
    recipeImg.src = recipeBox.img;
    recipeImg.classList.add('recipeImg');

    let textCage = document.createElement('div');
    textCage.classList.add('textCage');
    textCage.textContent = recipeBox.name === '' ? 'Recipe' : recipeBox.name;

    let btnOptions = document.createElement('img');
    btnOptions.classList.add('btnOptions');
    btnOptions.src = btnOptionsImg;
    btnOptions.addEventListener('click', () => {
        btnOptions2.classList.toggle('aparacion');
        btnOptions3.classList.toggle('aparacion');
    });

    let btnOptions2 = document.createElement('img');
    btnOptions2.classList.add('btnOptions2');
    btnOptions2.src = deleteCan;
    btnOptions2.addEventListener('click', () => {
        recipeBox.remove();
        saveRecipesToLocalStorage();
    });

    let btnOptions3 = document.createElement('img');
    btnOptions3.classList.add('btnOptions3');
    btnOptions3.src = lapiz;
    btnOptions3.addEventListener('click', () => {
        editRecipes(recipeBox);
        document.querySelector('.bkg2').style.display = 'none';
        document.querySelector('.blackBkg').style.display = 'none';
    });

    recipeBkg.addEventListener('click', () => {
        seeRecipes(recipeBox);
        document.querySelector('.bkg2').style.display = 'none';
        document.querySelector('.blackBkg').style.display = 'none';
    });
    textCage.addEventListener('click', () => {
        seeRecipes(recipeBox);
    });

    recipeBkg.appendChild(recipeImg);
    recipeBox.append(recipeBkg, textCage, btnOptions, btnOptions2, btnOptions3);
    recipeBox.setAttribute('data-recipe-id', recipeId);

    return recipeBox;
};

function addRecipeToContainer(recipe) {
    recipeContainer.insertAdjacentElement('afterbegin', recipe);
    const recipes = JSON.parse(localStorage.getItem('recipes')) || [];
    localStorage.setItem('recipes', JSON.stringify(recipes));
    saveRecipesToLocalStorage();
}

btnListOfRecipes.addEventListener('click', () => {

    let background2 = document.createElement('div');
    background2.classList.add('bkg2');

    let blackBkg = document.createElement('div');
    blackBkg.classList.add('blackBkg');
    body.insertAdjacentElement('afterbegin', blackBkg);

    page.append(background2);

    let listOfRecipesHeader = document.createElement('h3');
    listOfRecipesHeader.textContent = 'YOUR RECIPES:';

    let deleteBtn = document.createElement('img');
    deleteBtn.classList.add('deleteBtn');
    deleteBtn.src = deleteBtnImg;
    deleteBtn.addEventListener('click', () => {
        blackBkg.remove();
        background2.remove();
    });

    background2.append(listOfRecipesHeader, recipeContainer, deleteBtn);
});

function seeRecipes(recipeBox) {
    let blackBkg = document.createElement('div');
    blackBkg.classList.add('blackBkg');

    let background3 = document.createElement('div');
    background3.classList.add('bkg3');
    page.append(blackBkg, background3);

    // first cage //
    let firstCage = document.createElement('div');
    firstCage.classList.add('firstCage2');
    let nameOfRecipe = document.createElement('p');
    nameOfRecipe.textContent = `${recipeBox.name === '' ? 'Recipe' : recipeBox.name}`;
    nameOfRecipe.classList.add('titular');
    let bkgPreviewImage = document.createElement('div');
    bkgPreviewImage.classList.add('bkgPreviewImage');
    let previewImage = document.createElement('img');
    previewImage.src = `${recipeBox.img}`;
    previewImage.classList.add('previewImage');
    bkgPreviewImage.appendChild(previewImage);
    let descriptionHeader = document.createElement('h3');
    descriptionHeader.textContent = 'Description:';
    descriptionHeader.classList.add('space');
    let descriptionTextarea = document.createElement('textarea');
    descriptionTextarea.classList.add('DescpTextarea');
    descriptionTextarea.textContent = `${recipeBox.description}`;
    descriptionTextarea.setAttribute('readonly', 'true');

    // second cage //
    let secondCage = document.createElement('div');
    secondCage.classList.add('secondCage');
    let ingredientsHeader = document.createElement('h3');
    ingredientsHeader.textContent = 'Ingredients:';
    let ingredientsTextarea = document.createElement('textarea');
    ingredientsTextarea.classList.add('CageTextarea');
    ingredientsTextarea.textContent = `${recipeBox.ingredients}`;
    ingredientsTextarea.setAttribute('readonly', 'true');

    // third cage //
    let thirdCage = document.createElement('div');
    thirdCage.classList.add('thirdCage');
    let preparationHeader = document.createElement('h3');
    preparationHeader.textContent = 'Preparation:';
    let preparationTextarea = document.createElement('textarea');
    preparationTextarea.classList.add('CageTextarea');
    preparationTextarea.textContent = `${recipeBox.preparation}`;
    preparationTextarea.setAttribute('readonly', 'true');

    // delete btn //
    let deleteBtn = document.createElement('img');
    deleteBtn.classList.add('deleteBtn');
    deleteBtn.src = deleteBtnImg;
    deleteBtn.addEventListener('click', () => {
        blackBkg.remove();
        background3.remove();
        document.querySelector('.bkg2').style.display = 'flex';
        document.querySelector('.blackBkg').style.display = 'block';
    });

    firstCage.append(nameOfRecipe, bkgPreviewImage, descriptionHeader, descriptionTextarea);
    secondCage.append(ingredientsHeader, ingredientsTextarea);
    thirdCage.append(preparationHeader, preparationTextarea);

    background3.append(firstCage, secondCage, thirdCage, deleteBtn);
};

function editRecipes(recipeBox) {
    let blackBkg = document.createElement('div');
    blackBkg.classList.add('blackBkg');

    let background = document.createElement('div');
    background.classList.add('bkg');
    page.append(blackBkg, background);

    // first cage //
    let firstCage = document.createElement('div');
    firstCage.classList.add('firstCage');
    let nameOfRecipe = document.createElement('h3');
    nameOfRecipe.textContent = 'Recipe name:';
    let inputNameOfRecipe = document.createElement('input');
    inputNameOfRecipe.type = 'text';
    inputNameOfRecipe.classList.add('inputName');
    inputNameOfRecipe.value = recipeBox.name === '' ? 'Recipe' : recipeBox.name;
    inputNameOfRecipe.setAttribute('maxlength', '30');
    let bkgPreviewImage = document.createElement('div');
    bkgPreviewImage.classList.add('bkgPreviewImage');
    let previewImage = document.createElement('img');
    previewImage.src = recipeBox.img;
    previewImage.classList.add('previewImage');
    bkgPreviewImage.appendChild(previewImage);
    let descriptionHeader = document.createElement('h3');
    descriptionHeader.textContent = 'Description:';
    descriptionHeader.classList.add('space');
    let descriptionTextarea = document.createElement('textarea');
    descriptionTextarea.classList.add('DescpTextarea');
    descriptionTextarea.value = recipeBox.description;
    let headerInputFile = document.createElement('h4');
    headerInputFile.textContent = 'Image(optional):';
    headerInputFile.classList.add('space');
    let inputFile = document.createElement('input');
    inputFile.type = 'file';
    inputFile.accept = 'image/*';
    inputFile.addEventListener('change', function (event) {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = function (e) {
            previewImage.src = e.target.result;
        };
        reader.readAsDataURL(file);
    });

    // second cage //
    let secondCage = document.createElement('div');
    secondCage.classList.add('secondCage');
    let ingredientsHeader = document.createElement('h3');
    ingredientsHeader.textContent = 'Ingredients:';
    let ingredientsTextarea = document.createElement('textarea');
    ingredientsTextarea.classList.add('CageTextarea');
    ingredientsTextarea.value = recipeBox.ingredients;

    // third cage //
    let thirdCage = document.createElement('div');
    thirdCage.classList.add('thirdCage');
    let preparationHeader = document.createElement('h3');
    preparationHeader.textContent = 'Preparation:';
    let preparationTextarea = document.createElement('textarea');
    preparationTextarea.classList.add('CageTextarea');
    preparationTextarea.value = recipeBox.preparation;

    // delete btn //
    let deleteBtn = document.createElement('img');
    deleteBtn.classList.add('deleteBtn');
    deleteBtn.src = deleteBtnImg;
    deleteBtn.addEventListener('click', () => {
        blackBkg.remove();
        background.remove();
        document.querySelector('.bkg2').style.display = 'flex';
        document.querySelector('.blackBkg').style.display = 'block';
    });

    // save button //
    let saveBtn = document.createElement('img');
    saveBtn.classList.add('AddToRecipesBtn');
    saveBtn.src = saveBtnImg;
    saveBtn.addEventListener('click', () => {
        let newName = inputNameOfRecipe.value === '' ? 'Recipe' : inputNameOfRecipe.value;
        let newImg = previewImage.src;
        let newDescription = descriptionTextarea.value;
        let newIngredients = ingredientsTextarea.value;
        let newPreparations = preparationTextarea.value;

        recipeBox.querySelector('.textCage').textContent = newName;
        recipeBox.querySelector('.recipeImg').src = newImg;

        recipeBox.name = newName;
        recipeBox.img = newImg;
        recipeBox.description = newDescription;
        recipeBox.ingredients = newIngredients;
        recipeBox.preparation = newPreparations;

        saveRecipesToLocalStorage();
        blackBkg.remove();
        background.remove();
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
        })
        Toast.fire({
            icon: 'success',
            title: 'Recipe Saved'
        });
    });

    firstCage.append(nameOfRecipe, inputNameOfRecipe, headerInputFile, bkgPreviewImage, inputFile, descriptionHeader, descriptionTextarea);
    secondCage.append(ingredientsHeader, ingredientsTextarea);
    thirdCage.append(preparationHeader, preparationTextarea);
    background.append(firstCage, secondCage, thirdCage, deleteBtn, saveBtn);
};