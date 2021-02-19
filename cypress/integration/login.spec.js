describe("Login Test", () => {
  it("Shows error when submitting no data", () => {
    cy.visit("/");
    cy.get("button").click();
    cy.get("#email-input").should("have.class", "border-danger");
    cy.get("#password-input").should("have.class", "border-danger");
  });
  it("Shows error only when submitting invalid data", () => {
    cy.get("#email-input")
      .type("user.name@mail.co")
      .should("not.have.class", "border-danger")
      .type("{backspace}{backspace}")
      .should("have.class", "border-danger")
      .type("com")
      .should("not.have.class", "border-danger");
    cy.get("#password-input")
      .type("1")
      .should("not.have.class", "border-danger")
      .type("23456")
      .should("not.have.class", "border-danger");
  });
  it("Successfully logs in every other time", () => {
    cy.intercept(
      "POST",
      "https://run.mocky.io/v3/8c177baa-3894-4ac1-8156-24c2e36dc88e"
    ).as("login");
    cy.intercept(
      "POST",
      "https://run.mocky.io/v3/26078f17-0ae4-4e26-9e80-4d17efa5572a"
    ).as("fakelogin");

    const stub = cy.stub();
    cy.on("window:alert", stub);

    cy.get("button").click();

    cy.wait(["@login"]).then(() => {
      expect(stub.getCall(0)).to.be.calledWith("Bem-vindo, Great Person!");
    });

    cy.get("button").click();

    cy.wait(["@fakelogin"]).then(() => {
      expect(stub.getCall(1)).to.be.calledWith("Credenciais incorretas :/");
    });
  });
});
