import { defineQuery } from "next-sanity";

// Details of all startups
export const STARTUP_QUERY =
    defineQuery(`*[_type == "startup" && defined(slug.current) && !defined($search)||title match $search ||category match $search || author->name match $search] | order(_createdAt desc){
    _id,
    title,
        slug,
        _createdAt,
        author -> {_id, name, image, bio},
        views,
            description,
            category,
            image
    }  `);

export const STARTUP_INFO_BY_ID =
    defineQuery(`*[_type == "startup" && _id == $id][0]{
  _id,
    title,
    slug,
    _createdAt,
    author -> {_id,name,username,image,bio},
    views,
    description,
    category,
    image,
    pitch
}`);

export const STARTUP_VIEWS_QUERY = defineQuery(`
    *[_type == "startup" && _id == $id][0]{
        _id, views
    }
`);

// this query is for to fetch the github user _id and save the info in author id field in auth.tsx file for updating the session details

export const AUTHOR_BY_GITHUB_ID_QUERY =
    defineQuery(`*[_type == "author" && id == $id][0]{
    _id,id,name,username,email,image,bio
    }`);

// Fetching the author details
export const AUTHOR_BY_ID_QUERY = defineQuery(`
*[_type == "author" && _id == $id][0]{
    _id,
    id,
    name,
    username,
    email,
    image,
    bio
}
`);

export const STARTUPS_AUTHOR =
    defineQuery(`*[_type == "startup" && author._ref == $id] | order(_createdAt desc){
    _id,
    title,
        slug,
        _createdAt,
        author -> {_id, name, image, bio},
        views,
            description,
            category,
            image
    }  `);
