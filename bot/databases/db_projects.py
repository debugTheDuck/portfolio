import sqlite3
import json

import hashlib

async def add_project(data):
    with sqlite3.connect('projects.db') as db:
        cur = db.cursor()

        project_type = data["project_type"]
        project_name = json.dumps(data["project_name"])
        unique_hash = await create_hash(data["project_type"], data["project_name"])
        project_img = json.dumps(data["project_img"])
        project_description = json.dumps(data["project_description"])
        project_content_counter = int(data["counter"])
        project_content = [data[f"content{i+1}"] for i in range(project_content_counter)]
        project_content = json.dumps(project_content)

        if project_type == "web_dev":
            sql = "INSERT INTO web_dev(unique_hash, name, preview_img, description, content) VALUES (?,?,?,?,?)"

        elif project_type == "web_design":
            sql = "INSERT INTO web_design(unique_hash, name, preview_img, description, content) VALUES (?,?,?,?,?)"

        elif project_type == "graph_design":
            sql = "INSERT INTO graph_design(unique_hash, name, preview_img, description, content) VALUES (?,?,?,?,?)"
        
        elif project_type == "side_projects":
            sql = "INSERT INTO side_projects(unique_hash, name, preview_img, description, content) VALUES (?,?,?,?,?)"

        project_type = json.dumps(data["project_type"])

        params = (unique_hash, project_name, project_img, project_description, project_content,)

        cur.execute(sql, params)


async def create_hash(project_type, project_name):
    is_unique = False
    while is_unique == False:
        hashes = await get_hashes(project_type)
        unique_hash = generate_hash(project_name[0])

        if unique_hash not in hashes:
            is_unique = True
        else:
            project_name += "_1"

    return unique_hash

async def get_hash(project_type, project_name):
    with sqlite3.connect('projects.db') as db:
        cur = db.cursor()

        if project_type == "web_dev":
            sql = "SELECT unique_hash FROM web_dev WHERE name = ?"

        elif project_type == "web_design":
            sql = "SELECT unique_hash FROM web_design WHERE name = ?"

        elif project_type == "graph_design":
            sql = "SELECT unique_hash FROM graph_design WHERE name = ?"
        
        elif project_type == "side_projects":
            sql = "SELECT unique_hash FROM side_projects WHERE name = ?"

        cur.execute(sql, (json.dumps(project_name),))
        [unique_hash] = cur.fetchone()
        
        return unique_hash
    
            

async def get_hashes(project_type):
    with sqlite3.connect('projects.db') as db:
        cur = db.cursor()

        if project_type == "web_dev":
            sql = "SELECT unique_hash FROM web_dev"

        elif project_type == "web_design":
            sql = "SELECT unique_hash FROM web_design"

        elif project_type == "graph_design":
            sql = "SELECT unique_hash FROM graph_design"
        
        elif project_type == "side_projects":
            sql = "SELECT unique_hash FROM side_projects"

        cur.execute(sql)
        hashes = cur.fetchall()

        return hashes


def generate_hash(input_string):
    hash_object = hashlib.sha256()
    hash_object.update(input_string.encode('utf-8'))
    return hash_object.hexdigest()[0:9]
