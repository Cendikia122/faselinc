"use client";
import { useState } from "react";
import { toast } from "react-toastify";

const FooterNewsLetter = () => {
    const [email, setEmail] = useState("");

    const handleSubscribe = async (event) => {
        event.preventDefault();

        // Ganti dengan Getform Endpoint milikmu
        const getformURL = "https://getform.io/f/bllyzveb";

        const response = await fetch(getformURL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
        });

        if (response.ok) {
            toast.success("Thanks For Subscribe!");
            setEmail(""); // Reset input
        } else {
            toast.error("Failed to subscribe. Try again.");
        }
    };

    return (
        <form onSubmit={handleSubscribe}>
            <input
                type="email"
                placeholder="Your Email"
                className="form-control"
                name="email"
                aria-label="Alamat Email untuk Berlangganan Newsletter"
                autoComplete="off"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit" aria-label="Berlangganan Newsletter">Subscribe</button>
        </form>
    );
};

export default FooterNewsLetter;
