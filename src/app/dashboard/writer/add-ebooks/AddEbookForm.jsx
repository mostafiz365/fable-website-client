"use client";
import React, { useState } from "react";
import { Form, Fieldset, Button } from "@heroui/react";
import { BookOpen, DollarSign, ImagePlus, FileText, Bookmark, Loader2 } from "lucide-react";
import { createBook } from "@/lib/actions/books";
import { redirect } from "next/navigation";

// Hero UI v3 এর ইনপুট ফিল্ড ও থিমিং কাস্টম ক্লাসেস (Fable থিম অনুযায়ী)
const textInputClass = "w-full bg-[#b36b6b]/5 border border-[#ecd5cf]/60 rounded-xl px-4 py-3 text-sm text-[#2c3e50] placeholder:text-gray-400 focus:outline-none focus:border-[#b36b6b] focus:ring-1 focus:ring-[#b36b6b] transition-all";
const textAreaClass = "w-full bg-[#b36b6b]/5 border border-[#ecd5cf]/60 rounded-xl px-4 py-3 text-sm text-[#2c3e50] placeholder:text-gray-400 focus:outline-none focus:border-[#b36b6b] focus:ring-1 focus:ring-[#b36b6b] transition-all resize-none";
const triggerClasses = "w-full bg-[#b36b6b]/5 border border-[#ecd5cf]/60 rounded-xl px-4 py-3 text-sm text-[#2c3e50] flex items-center justify-between cursor-pointer focus:border-[#b36b6b] transition-all";
const popoverClasses = "bg-white border border-[#ecd5cf]/60 rounded-xl shadow-xl p-1 z-50 min-w-[200px]";
const listItemClasses = "px-4 py-2.5 text-sm text-[#2c3e50] rounded-lg cursor-pointer hover:bg-[#b36b6b]/10 hover:text-[#b36b6b] transition-colors outline-none";

export default function AddEbookForm({ user }) {
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState("");

    console.log(user)

    // ইমেজ সিলেক্ট এবং প্রিভিউ হ্যান্ডলার
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    // ফরম সাবমিশন এবং ব্যাকএন্ড হ্যান্ডলিং
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrors({});

        const formData = new FormData(e.currentTarget);
        const title = formData.get("title");
        const description = formData.get("description");
        const price = formData.get("price");
        const genre = formData.get("genre");

        // ক্লায়েন্ট সাইড বেসিক ভ্যালিডেশন
        const newErrors = {};
        if (!title) newErrors.title = "Ebook title is required";
        if (!description) newErrors.description = "Full content description is required";
        if (!price) newErrors.price = "Price is required";
        if (!genre) newErrors.genre = "Please select a genre";
        if (!imageFile) newErrors.coverImage = "Cover image is required";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setLoading(false);
            return;
        }

        try {
            // ১. imgBB তে ইমেজ আপলোড প্রসেস
            const imgBBFormData = new FormData();
            imgBBFormData.append("image", imageFile);
            
            // আপনার imgBB API Key এখানে বসাবেন (যেমন: process.env.NEXT_PUBLIC_IMGBB_API_KEY)
            const imgBBApiKey = process.env.NEXT_PUBLIC_IMAGE_UPLOAD_API; 
            const imgBBResponse = await fetch(`https://api.imgbb.com/1/upload?key=${imgBBApiKey}`, {
                method: "POST",
                body: imgBBFormData
            });
            const imgBBData = await imgBBResponse.json();

            if (!imgBBData.success) {
                throw new Error("Image upload failed to imgBB");
            }

            const coverImageUrl = imgBBData.data.url;

            // ২. MongoDB তে POST রিকোয়েস্টের জন্য ফাইনাল অবজেক্ট তৈরি
            const ebookPayload = {
                title,
                description,
                price: parseFloat(price),
                genre,
                coverImage: coverImageUrl,
                userId: user.id,
                writerName: user.name,
                status: "unpublished",
                createdAt: new Date()
            };

            // console.log(ebookPayload);

            const res = await createBook(ebookPayload)

            // const response = await fetch("/api/ebooks", {
            //     method: "POST",
            //     headers: {
            //         "Content-Type": "application/json",
            //     },
            //     body: JSON.stringify(ebookPayload),
            // });

            if (res.insertedId) {
                alert("Ebook successfully published on Fable!");
                // ফরম রিসেট
                e.target.reset();
                setImageFile(null);
                setImagePreview("");
                redirect('/dashboard/writer');
            } else {
                alert("Failed to save ebook to Database.");
            }

        } 
        // catch (error) {
        //     console.error("Submission Error:", error);
        //     alert("Something went wrong. Please check your console.");
        // } 
        finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto my-10 bg-white border border-[#ecd5cf]/50 rounded-2xl p-6 md:p-8 shadow-sm">
            <Form onSubmit={handleSubmit} className="space-y-8" validationErrors={errors} validationBehavior="aria">
                
                {/* SECTION 1: Essential Ebook Details */}
                <Fieldset className="space-y-6 w-full">
                    <legend className="text-xl font-serif font-bold text-[#2c3e50] border-b border-[#ecd5cf]/60 w-full pb-3 mb-2 flex items-center gap-2">
                        <BookOpen size={20} className="text-[#b36b6b]" />
                        Publish <span className="text-[#b36b6b]">New Ebook</span>
                    </legend>

                    {/* টাইটেল এবং জেনার */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-1 w-full">
                            <label className="text-[#2c3e50] font-medium text-sm">Ebook Title</label>
                            <input 
                                name="title" 
                                placeholder="e.g. The Secrets of the Novelist" 
                                className={textInputClass} 
                            />
                            {errors.title && <span className="text-xs text-danger mt-1">{errors.title}</span>}
                        </div>

                        <div className="flex flex-col gap-1 w-full">
                            <label className="text-[#2c3e50] font-medium text-sm">Genre / Category</label>
                            {/* Hero UI v3 এর কম্পাউন্ড সিলেক্ট ফরম্যাট */}
                            <select name="genre" className={triggerClasses} defaultValue="">
                                <option value="" disabled hidden>Select Genre</option>
                                <option value="fiction">Fiction</option>
                                <option value="mystery">Mystery & Thriller</option>
                                <option value="sci-fi">Sci-Fi & Cyberpunk</option>
                                <option value="history">History & Classic</option>
                                <option value="essay">Essays & Poetry</option>
                            </select>
                            {errors.genre && <span className="text-xs text-danger mt-1">{errors.genre}</span>}
                        </div>
                    </div>

                    {/* প্রাইস এবং কভার ইমেজ আপলোড */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                        <div className="flex flex-col gap-1 w-full relative">
                            <label className="text-[#2c3e50] font-medium text-sm">Set Price (USD)</label>
                            <div className="relative flex items-center">
                                <DollarSign size={16} className="absolute left-3 text-gray-400 pointer-events-none z-10" />
                                <input 
                                    name="price" 
                                    type="number" 
                                    step="0.01" 
                                    placeholder="0.00" 
                                    className={`${textInputClass} pl-9`} 
                                />
                            </div>
                            {errors.price && <span className="text-xs text-danger mt-1">{errors.price}</span>}
                        </div>

                        {/* কভার ইমেজ আপলোড সেকশন (imgBB ইন্টিগ্রেশনের সুবিধার্থে কাস্টমাইজড) */}
                        <div className="flex flex-col gap-1 w-full">
                            <label className="text-[#2c3e50] font-medium text-sm">Cover Image</label>
                            <div className="flex items-center gap-4">
                                <label className="flex items-center justify-center gap-2 bg-[#b36b6b]/5 hover:bg-[#b36b6b]/10 text-[#b36b6b] border border-dashed border-[#b36b6b]/40 rounded-xl px-4 py-3 text-sm font-medium cursor-pointer transition-all flex-grow text-center">
                                    <ImagePlus size={16} />
                                    {imageFile ? "Change Cover" : "Upload Cover Image"}
                                    <input 
                                        type="file" 
                                        accept="image/*" 
                                        onChange={handleImageChange} 
                                        className="hidden" 
                                    />
                                </label>
                                
                                {/* ইমেজ সিলেক্ট করা হলে ছোট একটি প্রিভিউ বক্স */}
                                {imagePreview && (
                                    <div className="w-12 h-12 rounded-lg overflow-hidden border border-[#ecd5cf] flex-shrink-0">
                                        <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                    </div>
                                )}
                            </div>
                            {errors.coverImage && <span className="text-xs text-danger mt-1">{errors.coverImage}</span>}
                        </div>
                    </div>
                </Fieldset>

                {/* SECTION 2: Full Content / Description */}
                <Fieldset className="space-y-6 w-full">
                    <legend className="text-lg font-serif font-bold text-[#2c3e50] border-b border-[#ecd5cf]/40 w-full pb-2 mb-2 flex items-center gap-2">
                        <FileText size={18} className="text-[#b36b6b]" />
                        Ebook Description & Content
                    </legend>

                    <div className="flex flex-col gap-1 w-full">
                        <label className="text-[#2c3e50] font-medium text-sm">Full Content Description</label>
                        <textarea
                            name="description"
                            placeholder="Write a comprehensive description or full introductory content of your ebook that readers will see..."
                            rows={6}
                            className={textAreaClass}
                        />
                        {errors.description && <span className="text-xs text-danger mt-1">{errors.description}</span>}
                    </div>
                </Fieldset>

                {/* ফরম অ্যাকশনস (সাবমিট এবং ক্যানসেল বাটন) */}
                <div className="flex justify-end gap-3 pt-4 border-t border-[#ecd5cf]/40 w-full">
                    <Button
                        type="button"
                        variant="flat"
                        className="bg-transparent border border-[#ecd5cf] text-[#2c3e50] hover:bg-[#fbf4f2] rounded-xl px-6 font-medium h-11"
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        disabled={loading}
                        className="bg-[#b36b6b] hover:bg-[#b36b6b]/90 text-white font-semibold rounded-xl px-6 shadow-md shadow-[#b36b6b]/10 transition-all h-11 flex items-center gap-2"
                    >
                        {loading ? (
                            <>
                                <Loader2 size={16} className="animate-spin" />
                                Publishing...
                            </>
                        ) : (
                            <>
                                <Bookmark size={16} />
                                Publish Ebook
                            </>
                        )}
                    </Button>
                </div>
            </Form>
        </div>
    );
}